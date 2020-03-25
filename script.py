import re
bases = {
  'A':'U',
  'T':'A',
  'G':'C',
  'C':'G',
  '\n':'\n'
}
geneticCode = {
'UUU':'F', 'UUF':'F', 'UUA':'L', 'UUG':'L', 
'UCU':'S', 'UCC':'S', 'UCA':'L', 'UCG':'L', 
'UAU':'T', 'UAC':'T', 'UAA':'ST', 'UAG':'ST', 
'UGU':'C', 'UGC':'C', 'UGA':'ST', 'UGG':'W', 
'CUU':'L', 'CUC':'L', 'CUA':'L', 'CUG':'L',
'CCU':'P', 'CCC':'P', 'CCA':'P', 'CCG':'P',
'CAU':'H', 'CAC':'H', 'CAA':'G', 'CAG':'G',
'CGU':'R', 'CGC':'R', 'CGA':'R', 'CGG':'R',
'AUU':'I', 'AUC':'I', 'AUA':'I', 'AUG':'M',
'ACU':'T', 'ACC':'T', 'ACA':'T', 'ACG':'T',
'AAU':'N', 'AAC':'N', 'AAA':'K', 'AAG':'K',
'AGU':'S', 'AGC':'S', 'AGA':'A', 'AGG':'A',
'GUU':'V', 'GUC':'V', 'GUA':'V', 'GUG':'V',
'GCU':'A', 'GCC':'A', 'GCA':'A', 'GCG':'A',
'GAU':'D', 'GAC':'D', 'GAA':'E', 'GAG':'E',
'GGU':'G', 'GGC':'G', 'GGA':'G', 'GGG':'G',
'\n':'\n'
}

file = open('./quemsoueu_transcricao.fasta', 'r')
lines = str()
for line in file:
  lines += line
flines = lines.splitlines()
head = flines[0]
bodyLines = flines[1:]
body = '\n'.join(bodyLines)
mRNA = str()
for char in body:
  mRNA += bases.get(char)
newFile = open('mRNA.fasta', 'w')
newFile.write(head+'\n'+mRNA)

forge = ''.join(mRNA.splitlines())

proc = re.split("(\S{3})", forge)
codons = list(filter(None, proc))

inicio = False   #Iniciar a proteina
fim = False      #Fim da proteina
proteinas = open("aminoacidos.fasta", "w") #arquivo para gravar os resultados
for i in codons:
  if geneticCode.get(i) == 'M' and inicio == False: #encontrar inicio
    inicio=True
    fim = False
    proteinas.write(geneticCode.get(i)+"-")
  elif geneticCode.get(i) == "ST" and inicio == True: #stop econtrando
    fim = True
    inicio = False
    proteinas.write("ST|") #mostar fim da proteina
    proteinas.write('\t') #gravar uma tabulaçao entre as proteinas
  elif inicio: #traduzir
    proteinas.write(geneticCode.get(i)+"-")
