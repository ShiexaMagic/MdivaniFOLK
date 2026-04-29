const fs=require('fs');
const s=fs.readFileSync('georgia.svg','utf8');
const re=/<path\s+d="([^"]+)"\s+title="([^"]+)"\s+id="([^"]+)"/g;
const out=[];let m;
while((m=re.exec(s))){out.push({id:m[3],title:m[2],d:m[1]});}
fs.mkdirSync('src/data',{recursive:true});
const body='// Auto-generated from georgia.svg\nexport type GeoPath = { id: string; title: string; d: string };\nexport const GEORGIA_VIEWBOX = "0 0 792.50702 401.40411";\nexport const GEORGIA_PATHS: GeoPath[] = '+JSON.stringify(out,null,2)+';\n';
fs.writeFileSync('src/data/georgia-paths.ts',body);
console.log('Wrote',out.length,'paths');
