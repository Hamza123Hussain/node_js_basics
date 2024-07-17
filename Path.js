import path from 'path'

const FileName = './dir1/dir2/dir3/text.txt'

console.log(path.basename(FileName)) // this gives us the name of the file

console.log(path.dirname(FileName)) // this gives us the path to the file

console.log(path.extname(FileName)) // this tells us what type of file

console.log(path.parse(FileName)) // it gives complete detail of file in a object

console.log(path.join(FileName, 'dir22')) // creating a further path
