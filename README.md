# PascalJS
Translated programming language with pascal-like syntax.


This is still in development and not ready for use.

> This project has been made so i can learn regex better.

Current Progress:
- Basic stuff (comparison and attrbutes translation)
- For loops
- If statement

Current console commands:
- writeln(s) and write(s)
- execute(code) - translates code and runs it.
- clearConsole() - clears console

-> Pascal has many unused and probably not needed features for example:
- declaring function type
- using begin{}end. as main function

that are replaced by my translator with simpler things.

> I understand that pascal type declarations are there , to make pascal type-safe , but for ordinary problem solving , this would make things harder and un-necessary complex.

Example translation:
```Pascal

function allDivisors(n:integer):integer;
begin
    var divisors:array;
    for var i:=1 to n do begin
        if n mod i = 0 then divisors.push(i);
    end;
    return divisors;
end;


function main():integer;
begin
    writeln(allDivisors(25));
end;

```
Translated code:
```Javascript
function allDivisors(n)
{
    var divisors = new Array();
    for (var i=1;i<n;i++) {
        if (n % i == 0) divisors.push(i);
    }
    return divisors;
}


function main()
{
    writeln(allDivisors(25));
}


main();

//writeln function is made inside the "compiler"
```
