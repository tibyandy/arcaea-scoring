import { promises as fs } from 'fs'

export const readFileContentsAsString = fileSrc => fs.readFile(fileSrc, { encoding: 'utf-8' })

export const splitLinesIntoArray = string => string.split('\n')

export const forEachEntry = (...executorFns) => array => executorFns.reduce(
    (array, executorFn) => array.map(executorFn),
    array
)

export const trim = string => string.trim()

export const splitByTabs = string => string.split('\t')
export const splitByPipes = string => string.split('|')

export const isEmpty = string => string.trim() === ''

export const filterEmptyEntries = array => array.filter(e => !isEmpty(e))
