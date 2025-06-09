
import { Agent, ConsoleLogger, CredentialEventTypes, CredentialState, CredentialStateChangedEvent, getAgentModules, InitConfig, initializeAgent, LogLevel, MediatorPickupStrategy } from '@credebl/ssi-mobile';
import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AgentContextType {
  agent: Agent | undefined,
  initAgent: (pin: string) => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: ReactNode }) => {
    const [agent, setAgent] = useState<Agent | undefined>(undefined);
    
    const initAgent = async (pin: string) => {
        try {
            const config: InitConfig = {
            label: 'Amit',
            walletConfig: {
                id: 'amitwallet',
                key: pin
            },
            logger: new ConsoleLogger(LogLevel.debug),
            autoUpdateStorageOnStartup: true
            }

            const agent = await initializeAgent({
                agentConfig: config,
                modules: getAgentModules({
                    mediatorInvitationUrl: 'https://dev-mediator.sovio.id/invite?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiI2YjQzYzcyNy1mMzEzLTQ1YzktYjVjMS00YTUxMjcxODVjZjEiLCJsYWJlbCI6InNvdmlvX21lZGlhdG9yIiwiYWNjZXB0IjpbImRpZGNvbW0vYWlwMSIsImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwiaGFuZHNoYWtlX3Byb3RvY29scyI6WyJodHRwczovL2RpZGNvbW0ub3JnL2RpZGV4Y2hhbmdlLzEuMSIsImh0dHBzOi8vZGlkY29tbS5vcmcvY29ubmVjdGlvbnMvMS4wIl0sInNlcnZpY2VzIjpbeyJpZCI6IiNpbmxpbmUtMCIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vZGV2LW1lZGlhdG9yLnNvdmlvLmlkIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWt2OHFBOHZEOUFvYmFOU0JDb29WckxnNzJoV0hENlkxdUFqYTlkemJiMmRKWCJdLCJyb3V0aW5nS2V5cyI6W119LHsiaWQiOiIjaW5saW5lLTEiLCJzZXJ2aWNlRW5kcG9pbnQiOiJ3c3M6Ly9kZXYtbWVkaWF0b3Iuc292aW8uaWQiLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa3Y4cUE4dkQ5QW9iYU5TQkNvb1ZyTGc3MmhXSEQ2WTF1QWphOWR6YmIyZEpYIl0sInJvdXRpbmdLZXlzIjpbXX1dfQ', 
                    mediatorPickupStrategy: MediatorPickupStrategy.PickUpV2LiveMode,
                    indyNetworks: [{
                        genesisTransactions: 'dummy',
                        isProduction: false,
                        indyNamespace: 'string',
                    }]
                })
            })
            setAgent(agent)
        } catch(error) {
            throw(error)
        }
    }

    const handleCredentialStateChange = async(events: CredentialStateChangedEvent) => {
        if(events.payload.credentialRecord.state === CredentialState.OfferReceived && events.payload.previousState === null) {
            router.push({pathname: '/credentialOffer', params: {
                id: events.payload.credentialRecord.id,
                connectionId: events.payload.credentialRecord.connectionId
            }})
        }
    }

    useEffect(() => {
        if(agent) {
            agent.events.observable<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged).subscribe(handleCredentialStateChange)
        }
    }, [agent])


    const values = {
        agent,
        initAgent
    }
    return (
        <AgentContext.Provider value={values}>
        {children}
        </AgentContext.Provider>
    );
};

// Custom hook for easier usage
export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within a AgentProvider');
  }
  return context;
};
