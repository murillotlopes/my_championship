import { execFile } from 'child_process';
import path from 'path';

export class GenerateMatchScoreService {

  public async getMatchScores(): Promise<{ teamA: number; teamB: number }> {

    return new Promise((resolve, reject) => {

      const pythonScriptPath = path.resolve(__dirname, '../../../../test.py')

      execFile('python', [pythonScriptPath], (error, stdout, stderr) => {

        if (error) return reject(`Error executing Python script: ${error.message}`)

        if (stderr) return reject(`Error in Python script: ${stderr}`)

        const output = stdout.trim().split('\n')

        if (output.length < 2) return reject('Invalid output from Python script')

        const teamA = parseInt(output[0], 10);
        const teamB = parseInt(output[1], 10);

        if (isNaN(teamA) || isNaN(teamB)) return reject('Invalid output: Scores are not valid numbers')

        resolve({ teamA, teamB })

      })

    })

  }

}

