# Spellchecker

### Description
This program checks text files for misspelled words, and gives suggested replacements.

### Instructions
Save the text file you wish to spellcheck to the **root** of the file. There is a dictionary already provided: `dictionary.txt`, or you can provide your own.

**Note:** This project will not work with any other kind of file.

No need to install project dependencies, just please make sure your Node version is at least version v16.20.2.

Run the command `spellchecker nameofdictionaryfile.txt nameofspellcheckfile.txt`

The program will output a list of misspelled words, the location of the misspelled word and a couple of corrected suggestions.
```
Here are the words you misspelled:  [ 'ack', 'hedy', 'tst', 'teh' ]
You entered "ack" on line 1. Did you mean back or hack?
You entered "hedy" on line 2. Did you mean heady or hedgy?
You entered "tst" on line 3. Did you mean test or tost?
You entered "teh" on line 4. Did you mean teth?
```
### Organization
I added the `util` directory in order to pull out the file system data parsing. I used `fs.readFileSync` which is synchronous because the program depends on the dictionary. 
However, checking the file submitted for spellchecking could also be synchronous, but the beauty of Node is its asynchronicity, and if we wanted to add more files later on, 
this doesn't need to block the rest of the script from running.

The main logic can be found in `bin/index.js`.

### Notes
It's still a work in progress. Originally, I submitted this for timed code challenge,
and I didn't want this code to go to waste. It needs some tests and added functionality.