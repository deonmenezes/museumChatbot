// pages/api/museums.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'data')
    // Read the json data file data.json
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8')
    // Parse the JSON string into a JavaScript object
    const museums = JSON.parse(fileContents)
    // Return the content of the data file in json format
    res.status(200).json(museums)
  } catch (error) {
    // Handle errors such as file not found or JSON parsing errors
    console.error('Error reading or parsing data.json:', error)
    res.status(500).json({ message: 'Error reading data file' })
  }
}
