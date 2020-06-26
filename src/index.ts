var fs  = require('fs');

const files = fs.readdirSync('data/maps');

const rect1 = fs.readFileSync('data/maps/' + files[1], 'utf-8');

const fileAsArray = rect1.split('\n');
let soluce:string[]=[]

console.log('fileAsArray:', fileAsArray)

let start = 0;
let end = 0;
let cstart = 0;
let cend =0;
let count = 0;


for (let l = 0; l < fileAsArray.length; l++) {
  soluce[l]=fileAsArray[l]
  count++
  if(fileAsArray[l] !== undefined)
  {
      const arrayLine = fileAsArray[l].split('');

      for (let lettre = 0; lettre < arrayLine.length; lettre++) {
          if (arrayLine[lettre] === '1') {
              start = l;
              cstart = lettre
          }
          if (arrayLine[lettre] === '2') {
              end = l;
              cend = lettre
          }
      }
  }
}


function  show_maps() {
  let compt_ligne:string=''
  let espace_dimension_before:string=''
  let espace_maps:string=''
  let espace_dimension:string=''
  let espace_width:string=''
  let tiret:string=''


  for (let line = 0; line < fileAsArray[1].length ; line++) {
      compt_ligne+= ' '
      tiret+= '-'
  }

  for (let line = 0; line < compt_ligne.length/3-2; line++) {
      espace_dimension_before+= ' '
  }

  for (let line = 0; line <  compt_ligne.length - (espace_dimension_before.length + 4) ; line++) {
      espace_maps+= ' '
  }


  for (let line = 0; line <compt_ligne.length - (espace_dimension_before.length +10) ; line++) {
      espace_dimension+= ' '
  }

  for (let line = 0; line <compt_ligne.length - (espace_dimension_before.length + 6) ; line++) {
      espace_width+= ' '
  }


  for (let line = 0; line < fileAsArray.length; line++) {

      if(line === 0)
      {
          console.log(tiret + compt_ligne + tiret)
          console.log( espace_dimension_before+ "Maps"+ espace_maps+ compt_ligne + espace_dimension_before + "Soluce")
          console.log(tiret + compt_ligne + tiret)
          console.log( espace_dimension_before+ "Dimension" + espace_dimension + compt_ligne + espace_dimension_before+ "Dimension")
          if(fileAsArray[line].match(/\d+\d+/g) && soluce[line].match(/\d+\d+/g))
          {
              console.log( espace_dimension_before+ fileAsArray[line] + espace_width + compt_ligne + espace_dimension_before+ soluce[line])
              console.log(tiret + compt_ligne + tiret )
          }
          else {
              console.log(tiret + compt_ligne + tiret )
              console.log(fileAsArray[line] + compt_ligne + soluce[line])
          }
      }

      else
      {
          console.log(fileAsArray[line] + compt_ligne + soluce[line])
      }

  }
}

show_maps()


function clear() {
  for (let line = 0; line < fileAsArray.length+5; line++) {
     console.log('\n')
  }
}

function turnLeft(line_start:number, cols_start:number){
    for (let line = line_start; line < line_start + 1; line++) {
        const array = soluce[line].split('');
        let val:string=''
        let status:string='';
        for (let lettre = cols_start; lettre >= 0; lettre--) {

            if (array[lettre] === ' ' && status === '' ) {
                val += '⸰'
                status='block'
            }
            else{
                val += array[lettre]
            }
        }
        val=val.split("").reverse().join("");
        soluce[line] = val
        clear()
        show_maps()
    }
}


function turnRight(line_start:number, cols_start:number){
    for (let line = line_start+1; line < line_start + 2; line++) {
        const array = soluce[line].split('');
        let val:string=''
        let status:string='';
        for (let lettre = 0; lettre < array.length; lettre++) {

            if (array[lettre] === ' ' && status === ''  && lettre == cols_start) {
                val += '⸰'
                status='block'
            }
            else{
                val += array[lettre]
            }
        }
        soluce[line] = val
        clear()
        show_maps()
    }
}




function resolve() {
    if (start !== 0) {
        count -= start
    }
    if (end !== soluce.length) {
        count -= (soluce.length - (end + 1))
    }
    const array = soluce[start+1].split('');
    let compteur: number = 0
    while(start !== end)
    {
        if(cstart === (array.length-1))
        {
            compteur = 12
            while (array[compteur] === '*') {
                turnLeft(start, cstart)
                compteur--
            }
        }
        else
        {
            compteur = 0
            while (array[compteur] === '*') {
                turnRight(start, cstart)
                compteur++
            }
        }
        start++
    }
}
    resolve()