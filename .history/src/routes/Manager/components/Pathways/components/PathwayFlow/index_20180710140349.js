import React from 'react';
import Flowchart from 'react-simple-flowchart';

const opt = {
    x: 0,
    y: 0,
    'line-width': 3,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 14,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black',
    fill: 'white',
    'yes-text': 'yes',
    'no-text': 'no',
    'arrow-end': 'block',
    scale: 1,
    symbols: {
      start: {
        'font-color': 'red',
        'element-color': 'green',
        'font-weight': 'bold',
      },
      end: {
        'font-color': 'red',
        'element-color': 'green',
        'font-weight': 'bold',
      },
    },
    flowstate: {
      department1: { fill: 'pink' },
      department2: { fill: 'yellow' },
      external: { fill: 'green' },
    },
  };


  const code =
      `st=>start: Begin
e=>end: End
op1=>operation: Operation 1|department1
op2=>operation: Operation 2|department2
sub=>subroutine: Go To Google|external:>http://www.google.com
cond=>condition: Google?

st(right)->op1(right)->op2(right)->cond(yes)->sub(bottom)
cond(no)->e`;



const convertElementsToCode = elements => {
    let code = '';
     let st = '';
     let e = '';
     let vars = '';
     let rules ='st->';
    const elementsTotal = elements.length;
    console.log(elements);
     elements.map((element, i) => {
        const {typeText} = element;
        let label = 'op'+i;
        if (i === 0) {
            label = 'st';
            // start element
            st = label+'=>start: '+typeText+'\n';
            code +=st;
        } else if (elementsTotal === i+1) {
            // end element
            e = 'e=>end: '+typeText+'\n';
            code +=e;
        } else {
            label = 'op'+i;
            // just add element
            code += label+'=>operation: '+typeText+'\n';
            rules += label+'->';
        }

        

        return null;
     });

     rules += 'e';
     console.log(code);
     console.log(rules);
     

     return code+rules;
}
const PathwayFlow = props => {
    const {pathway} = props;
    const {elements=[]} = pathway;

    const chartCode = convertElementsToCode(elements);
    return <div style={{width:500, height:500, scroll:'auto'}}>
    <Flowchart
    chartCode={chartCode}
    options={opt}
  />
    <Flowchart
    chartCode={code}
    options={opt}
  /></div>
}

export default PathwayFlow;