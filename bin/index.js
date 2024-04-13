#!/usr/bin/env node
import fs from "fs";
import {argv, exit} from 'node:process';
import {formatData, getDictionaryContents, getFileToCheckContents} from "../util/fsUtil.js";

const dictionary = argv[2]
const fileToCheck = argv[3]
const dictionaryDetails = getDictionaryContents(dictionary)
const formattedDictionary = formatData(dictionaryDetails)
const fileToReconcileDetails = await getFileToCheckContents(fileToCheck)

if (!fs.existsSync(dictionary)) {
    console.log("Dictionary not found, please try again")
    exit(1)
}

if (!fs.existsSync(fileToCheck)) {
    console.log("File submitted for spellchecking not found")
    exit(1)
}

if (formattedDictionary.length === 0) {
    console.error("Dictionary file is empty, unable to spell check")
    exit(1)
}

if (fileToReconcileDetails.length === 0) {
    console.error("Unable to reconcile, please check your files")
    exit(1)
}

const reconciliationMap = {}

fileToReconcileDetails.forEach((word, index) => {
    if (!reconciliationMap.hasOwnProperty(word)) {
        //add one since text files don't start at line 0
        reconciliationMap[word] = index + 1;
    }
})

const incorrectlySpelledWords = fileToReconcileDetails.filter((word) => word.length && !formattedDictionary.includes(word))

incorrectlySpelledWords.length ? console.log("Here are the words you misspelled: ", incorrectlySpelledWords): console.log("No misspellings found")

const findEditedMatches = (word) => {
    const editedResults = editMisspellings(word);
    return editedResults.filter((res) => {
        if (formattedDictionary.includes(res)) return res
    })
}

const editMisspellings = (word) => {
    const results = []
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

    //attempt to substitute each letter in the word, in each index of the word
    for (let i = 0; i < word.length; i++) {
        alphabet.forEach((ltr) => {
            results.push(word.slice(0, i) + ltr + word.slice(i));
        });
    }
    return results
}

const start = () => incorrectlySpelledWords.forEach(word => {
    if(!word.length) return;
    const match = findEditedMatches(word).slice(0, 2)
    if (!match.length) {
        console.log(`No similar words found for \"${word}\" entered on line ${reconciliationMap[word]}.`)
        return;
    }
    if (match.length > 1) {
        console.log(`You entered \"${word}\" on line ${reconciliationMap[word]}. Did you mean ${match.join(' or ')}?`)
    } else {
        console.log(`You entered \"${word}\" on line ${reconciliationMap[word]}. Did you mean ${match}?`)
    }
})

start()
exit();