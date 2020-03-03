//Pascal.JS

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

cprint('\x1b[31mPJS> \x1b[0m')
standard_input.on('data', function (data) {

    //parsing data
    data = data.trim()
    let defined = false;

    try {
        eval(data)
    } catch (error) {
        cprint(error+'\n')
    }

    cprint('\n\x1b[31mPJS> \x1b[0m')
    
});


function cprint (data){
    process.stdout.write(data)
}

function execute(data){
    let matches


    data = data.replace(/begin/g,`{`);data = data.replace(/end;/g,`}`);

    

    //Replace simple things
    data = data.replace(/=>/g,'^^^{arrowFunction}'); //js stuff
    data = data.replace(/\+=/g,'^^^{additionStuff}'); //js stuff
    data = data.replace(/\-=/g,'^^^{subtractionStuff}'); //js stuff
    data = data.replace(/\*=/g,'^^^{multiplicationStuff}'); //js stuff
    data = data.replace(/\\=/g,'^^^{divisionStuff}'); //js stuff

    data = data.replace(/\w*(?<!:)=/g,'==');//comparisons
    data = data.replace(/:=/g,'=');//atributions
    data = data.replace(/mod/g,'%');//modulus
    data = data.replace(/\w*(?<![A-Za-z])and(?![A-Za-z])/g,'&&');//modulus
    data = data.replace(/\w*(?<![A-Za-z])or(?![A-Za-z])/g,'||');//or



    //Reversion.
    data = data.replace(/\^\^\^\{arrowFunction\}/g,'=>');
    data = data.replace(/\^\^\^\{additionStuff\}/g,'+=');
    data = data.replace(/\^\^\^\{subtractionStuff\}/g,'-=');
    data = data.replace(/\^\^\^\{multiplicationStuff\}/g,'*=');
    data = data.replace(/\^\^\^\{arrowFuncdivisionStufftion\}/g,'\\=');

    //data = data.replace(/(:integer|:real|:longint|:double)/g,`=0;`);//types

    //Replace string types
    matches =  data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::string|:ansistring|:char)/)
    while(matches){
        data = data.replace(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::string|:ansistring|:char)/,`var ${matches[1]} = new String('')`)
        matches = data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::string|:ansistring|:char)/)
    }

    matches =  data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::array)/)
    while(matches){
        data = data.replace(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::array)/,`var ${matches[1]} = new Array()`)
        matches = data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::array)/)
    }

    

    //Replace integer types
    matches =  data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(:integer|:real|:longint|:extended)/)
    while(matches){
        data = data.replace(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::integer|:real|:longint|:extended)/,`var ${matches[1]} = new Number(0)`)
        matches = data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::integer|:real|:longint|:extended)/);
    }  
    
    matches =  data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(:boolean)/)
    while(matches){
        data = data.replace(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::boolean)/,`var ${matches[1]} = new Boolean(false)`)
        matches = data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?:boolean)/);
    } 

    //Replace simple for loops
    matches = data.match(/for ([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?do/);
    while(matches){
        data = data.replace(/for ([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?do/,`for (${matches[1]}=${matches[2]};i<${matches[3]};${matches[1]}++)`)
        matches = data.match(/for ([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?do/);
    }

    //Replace advanced for loops
    matches = data.match(/for(?:[ \t]+)var(?:[ \t]+)([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?do/);
    while(matches){
        data = data.replace(/for(?:[ \t]+)var(?:[ \t]+)([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?do/,`for (var ${matches[1]}=${matches[2]};i<${matches[3]};${matches[1]}++)`)
        matches = data.match(/for(?:[ \t]+)var(?:[ \t]+)([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([A-Za-z0-9]+)(?:[ \t]+)*?do/);
    }

    //Replace if statement
    matches = data.match(/if(?: |\()([^]+) then/);
    while(matches){
        data = data.replace(/if(?: |\()([^]+) then/,`if (${matches[1]})`)
        matches = data.match(/if(?: |\()([^]+) then/);
    }


    //functions
    matches =  data.match(/(?:procedure|function)[ \t]+([A-Za-z0-9]+)\(([^\)]+)*?\):[^;]+;/)
     while(matches){
        if(matches[2]){
            matches[2] = matches[2].replace(/(?::integer|:real|:longint|:extended|:boolean|:string|:ansistring|:char)+/g,'')
            matches[2] = matches[2].replace(/;/g,',')
        } else matches[2] = ''
        
        data = data.replace(/(?:procedure|function)[ \t]+([A-Za-z0-9]+)\(([^\)]+)*?\):[^;]+;/,`function ${matches[1]}(${matches[2]})`)
        matches = data.match(/(?:procedure|function)[ \t]+([A-Za-z0-9]+)\(([^\)]+)*?\):[^;]+;/)
    }

    writeln(data)
    try {
        eval(data)
    } catch (error) {
        writeln(error)
    }
    
}
// execute(`


// function main():integer;
// begin
//     var s:string;
//     s+=1;
//     s+=23;
//     writeln(s);

//     // 123
// end;


// main();
// `)
// exit();
function exit(data){
    process.exit()
}
function clearScreen(){
    process.stdout.write('\033c');
}

function writeln(...args){
    args.forEach((e,i)=>{
        cprint(e+'\n')
    })
}

function write(...args){
    args.forEach((e,i)=>{
        cprint(e)
    })
}


