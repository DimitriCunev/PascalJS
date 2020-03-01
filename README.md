# PascalJS
Code translation from FreePascal or PascalABC to Javascript


This is still in development and not ready for use.

> This project has been made so i can learn RegEx better.

Current Progress:
- Basic stuff (comparison and attrbutes translation)
- For loops
- If statement

Current console commands:
- writeln(s) and write(s)
- execute(code) - translates code and runs it.
- clearConsole() - clears console

Example translation:
```Pascal
for var i:=0 to 10 do begin
    if (i mod 2 = 0) then begin
        writeln(i);
    end;
end;
```

```Javascript
for (i=0;i<10;i++) {
    if ((i % 2 == 0)) {
        writeln(i);
    }
}

//writeln function is made inside the "compiler"
```
