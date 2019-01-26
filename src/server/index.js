import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from '../shared/App';
import arrayBooks from '../shared/books.json';
import serialize from "serialize-javascript";

const fetch = require('node-fetch');

const app = express();  //si crea un nuevo server invocando expressn
// import cors from "cors";

//si da l'istruzione a express di servire qualsiasi file statico dalla cartella dist
app.use(express.static('dist'));

// app.use(cors())

//per tutte le altre rute, si renderizzerá una pagina html:
app.get("*", (req, res, next) => {
    const arrayB = [];
    arrayB.push(arrayBooks);
    const name = arrayB[0].ficcion[0].title;
    const array = arrayB[0].ficcion;

    const arrayC = [];
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin';

    const fetchUrl = url => fetch(url).then(response => response.json())
                                      .then(data => arrayC.concat(data.drinks))
                                      .then(array2 => {

                                          const markup = renderToString(
                                            <App data={name} arrayPropr={array} arrayFromFetch={array} />
                                          )
                                        
                                          res.send(`
                                            <!DOCTYPE html>
                                            <html>
                                              <head>
                                                <title>SSR with RR</title>
                                                <script src="/bundle.js" defer></script>
                                                <script>window.__INITIAL_ARRAY__ = ${serialize(array)}</script>
                                                <script>window.__INITIAL_DATA__ = ${serialize(name)}</script>
                                                <script>window.__INITIAL_ARRAYFETCH__ = ${serialize(array2)}</script>
                                              </head>
                                        
                                              <body>
                                                <div id="app">${markup}</div>
                                              </body>
                                            </html>
                                          `)
                                          }
                                        )
                                    .catch((error) => {
                                      console.warn(error)
                                      return null
                                    });

  fetchUrl(url)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
}) // si ascolta il server da un porto definito o da un porto per difetto

