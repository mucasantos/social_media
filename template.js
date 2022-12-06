export default (user) => { 
    return `<!doctype html>     
     <html lang="en">          
    <head>             <meta charset="utf-8">             
    <title>MERN Skeleton</title>          
    </head>          
    <body>            
    <div id="root">${user}</div>         
     </body>     
      </html>` 
}