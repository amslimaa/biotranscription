var fs = require('fs')

const baseMap = new Map();

baseMap.set('A', 'U')
baseMap.set('T', 'A')
baseMap.set('G', 'C')
baseMap.set('C', 'G')

let arqName = './quemsoueu_transcricao.fasta';

fs.readFile(arqName, 'utf8', (err, data) => {
  if(err) console.log(`erro ao tentar abrir o arquivo: ${err}` );
  let lines = data.split('\n');
  let header = lines[0];
  fs.appendFile('./saida-mRNA.fasta', (header+'\n'), err => {
    if(err) console.log(`Erro ao criar arquivo de saida: ${err}`);
  });
  let bases = lines.splice(1);
  bases.map( base => {
    let mRNA = []
    bs = base.split('')
    bs.map(b => {
      mRNA.push(baseMap.get(b))
    })
    mRNA.push('\n');
    fs.appendFile('./saida-mRNA.fasta', mRNA.join(''), err => {
      if(err) console.log(`Erro ao criar arquivo de saida: ${err}`);
    });
  })
})