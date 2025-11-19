# Terminal Assistant

_A terminal assistant to manage and register recurring commands_

---

### Install:

1. First install the project dependencies

```Bash
npm install
```

2. After installation, run a build of the same

```Bash
npm run build
```

3. Link the project on your machine

```Bash
npm link || npm install -g tass
```

4. Verify link

```Bash
ls -l $(npm prefix -g)/bin | grep tass
```

Note: The command output must be the path to index.js

5. Based on the output you should build a command with a path similar to this

```Bash
chmod +x $(npm prefix -g)/lib/node_modules/terminal-assistant/dist/index.js
```

Note: this command will be used to give execution permission to index.js so that it can run globally.

6. Place the following snippet in your file:
   a. `.zshrc`:

   ```Bash
    ######################
    # Terminal Assistant #
    ######################

    # Captura o último comando digitado
    preexec() {
        LAST_COMMAND="$1"
    }

    # Executa a sugestão de comandos
    precmd() {
        if [[ -n "$LAST_COMMAND" && "$LAST_COMMAND" != tass* ]]; then
            tass suggest command="$LAST_COMMAND"
        fi
    }
   ```

   b. `.bashrc`:

   ```Bash
   ######################
   # Terminal Assistant #
   ######################

   # Captura o último comando digitado
    trap 'LAST_COMMAND=$BASH_COMMAND' DEBUG

    # Executa a sugestão de comandos após o comando terminar
    PROMPT_COMMAND='
    if [[ -n "$LAST_COMMAND" && "$LAST_COMMAND" != tass* ]]; then
        ( tass suggest "$LAST_COMMAND" )
    fi
    '
   ```

7. Restart the terminal, and now you can use the commands below globally and 'tass' will suggest registered commands for you anywhere.

---

### Commands:

#### ADD(`add`)

**_Params:_** command, successorCommand

**_Example:_** tass add command="my command" successorCommand="my sucessor command with {{parameters}}"

**_Note:_** The value within the variable 'command' does not need to be the complete command, but the more specific better.

---

#### LIST(`list`)

**_Params:_** XXXX

**_Example:_** tass list

**_Note:_** Lists the commands registered so far.

---

#### HELP(`help`)

**_Params:_** XXXX

**_Example:_** tass help

**_Note:_** Lists the commands and infos of script.

---

#### REMOVE(`remove`)

**_Params:_** command

**_Example:_** tass remove command="command to remove"

**_Note:_** Remove the given command.

---

#### SUGGEST(`suggest`)

**_Params:_** command, successorCommand

**_Example:_** tass suggest command="command to search successor"

**_Note:_** Searches for a successor command corresponding to the one entered.

---
