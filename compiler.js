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

    //Replace all instances of begin and end;
    // data = data.replace(/begin/g,`{`);data = data.replace(/end;/g,`}`);data = data.replace(/end./g,`}`);

    matches =  data.match(/begin([^]+)end./)
    while(matches){
        data = data.replace(/begin([^]+)end\./,`${matches[1]}`)
        matches = data.match(/begin([^]+)end\./,`${matches[1]}`)
    }

    matches =  data.match(/begin([^]+)end;/)
    while(matches){
        data = data.replace(/begin([^]+)end;/,`{${matches[1]}}`)
        matches = data.match(/begin([^]+)end;/,`{${matches[1]}}`)
    }

    //Replace simple things
    data = data.replace(/\w*(?<!:)=/g,'==');//comparisons
    data = data.replace(/:=/g,'=');//atributions
    data = data.replace(/mod/g,'%');//modulus
    data = data.replace(/\w*(?<![A-Za-z])and(?![A-Za-z])/g,'&&');//modulus
    data = data.replace(/\w*(?<![A-Za-z])or(?![A-Za-z])/g,'||');//or

    //data = data.replace(/(:integer|:real|:longint|:double)/g,`=0;`);//types

    //Replace string types
    matches =  data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::string|:ansistring|:char)/)
    while(matches){
        data = data.replace(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::string|:ansistring|:char)/,`var ${matches[1]} = new String('')`)
        matches = data.match(/var(?:[ \t]+)*?([A-Za-z0-9]+)(?::string|:ansistring|:char)/)
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
    matches = data.match(/for ([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?do/);
    while(matches){
        data = data.replace(/for ([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?do/,`for (${matches[1]}=${matches[2]};i<${matches[3]};${matches[1]}++)`)
        matches = data.match(/for ([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?do/);
    }

    //Replace advanced for loops
    matches = data.match(/for(?:[ \t]+)var(?:[ \t]+)([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?do/);
    while(matches){
        data = data.replace(/for(?:[ \t]+)var(?:[ \t]+)([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?do/,`for (var ${matches[1]}=${matches[2]};i<${matches[3]};${matches[1]}++)`)
        matches = data.match(/for(?:[ \t]+)var(?:[ \t]+)([^ =])(?:[ \t]+)*?=(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?to(?:[ \t]+)*?([0-9]+)(?:[ \t]+)*?do/);
    }

    //Replace if statement
    matches = data.match(/if(?: |\()([^]+) then/);
    while(matches){
        data = data.replace(/if(?: |\()([^]+) then/,`if (${matches[1]})`)
        matches = data.match(/if(?: |\()([^]+) then/);
    }
    writeln(data)
    try {
        eval(data)
    } catch (error) {
        writeln(error)
    }
    
}
execute(`
var b:string;
var c:integer;
var c:boolean;

begin
    for var i:=0 to 10 do begin
        if (i mod 2 = 0) then begin
        end;
    end;
end.
`)
exit();
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


