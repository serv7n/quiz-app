import { useState } from "react";
import Nav from "../components/Nav";

function Questions() {
  const questoes = {
    1: {
      title: "Qual o maior órgão do ser humano",
      alternativas: {
        1: "Cérebro",
        2: "Fígado",
        3: "Pulmão",
        4: "Pele",
      },
      correta: 4,
    },
    2: {
      title: "Quem foi o primeiro presidente do Brasil",
      alternativas: {
        1: "Getúlio Vargas",
        2: "Floriano Peixoto",
        3: "Deodoro da Fonseca",
        4: "Dom Pedro II",
      },
      correta: 3,
    },
    3: {
      title: "Qual planeta é conhecido como planeta vermelho",
      alternativas: {
        1: "Marte",
        2: "Vênus",
        3: "Júpiter",
        4: "Mercúrio",
      },
      correta: 1,
    },
    4: {
      title: "Em que continente fica o Egito",
      alternativas: {
        1: "Ásia",
        2: "América",
        3: "África",
        4: "Europa",
      },
      correta: 3,
    },
    5: {
      title: "Quantos lados tem um hexágono",
      alternativas: {
        1: "5",
        2: "6",
        3: "7",
        4: "8",
      },
      correta: 2,
    },
    6: {
      title: "Quem pintou a Mona Lisa",
      alternativas: {
        1: "Pablo Picasso",
        2: "Leonardo da Vinci",
        3: "Michelangelo",
        4: "Salvador Dalí",
      },
      correta: 2,
    },
    7: {
      title: "Qual é a capital da Argentina",
      alternativas: {
        1: "Montevidéu",
        2: "Buenos Aires",
        3: "Santiago",
        4: "Lima",
      },
      correta: 2,
    },
    8: {
      title: "Qual desses animais é um mamífero",
      alternativas: {
        1: "Jacaré",
        2: "Sapo",
        3: "Golfinho",
        4: "Galo",
      },
      correta: 3,
    },
    9: {
      title: "Quem escreveu Dom Casmurro",
      alternativas: {
        1: "José de Alencar",
        2: "Machado de Assis",
        3: "Graciliano Ramos",
        4: "Clarice Lispector",
      },
      correta: 2,
    },
    10: {
      title: "Qual é o resultado de 9 x 7",
      alternativas: {
        1: "56",
        2: "72",
        3: "63",
        4: "81",
      },
      correta: 3,
    },
  };
  const [progresso, setProgresso] = useState({
    step: 1,
    certas: 0,
  });
  // onClickButton(alternativa, question) =>{
  //     if(alternativa == question.correta){

  //     }
  // }  
  return (
    <>
      <main className="h-screen w-screen bg-blue-200 flex flex-col items-center">
        <Nav />
      <section className="flex flex-col items-center bg-blue-950 w-full min-h-screen p-8">
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold text-center max-w-2xl bg-amber-300-">
          {questoes[1].title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <button  className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
          {questoes[1].alternativas[1]}
        </button>
        <button className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
          {questoes[1].alternativas[2]}
        </button>
        <button className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
          {questoes[1].alternativas[3]}
        </button>
        <button className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
          {questoes[1].alternativas[4]}
        </button>
      </div>
    </section>
      </main>
    </>
  );
}
export default Questions;
