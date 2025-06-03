# Welcome to Cred wallet app 👋

# Environment Setup

This guide helps you set up the required dependencies to run the project locally on macOS.

---

## ✅ Prerequisites

Ensure you have [Homebrew](https://brew.sh/) installed on your system. Then follow the steps below:

---

### 1. Install Watchman

[Watchman](https://facebook.github.io/watchman/) is a tool developed by Facebook for watching changes in the filesystem.

```
brew install watchman
````

### 2. Install Java (Azul Zulu JDK 17)
Expo and some native build tools require Java. Install the Azul Zulu JDK 17 version:
```
brew install --cask zulu@17
```

### 3. Set JAVA_HOME Environment Variable
After installing Zulu JDK, configure the JAVA_HOME environment variable:

If using Bash:
Add this line to your ~/.bash_profile:

```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

Then reload the profile:
```
source ~/.bash_profile
```

If using Zsh:
Add this line to your ~/.zshrc:
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

Then reload the profile:
```
source ~/.zshrc
```


## Get started

### 1. Install dependencies

   ```bash
   yarn
   ```

### 2. Start the app (connect your android device and hit below command)

   ```bash
   yarn run android
   ```
