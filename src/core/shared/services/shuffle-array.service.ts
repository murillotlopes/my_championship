
export class ShuffleArray {

  public shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5)
  }

}