import { useState } from 'react';

const ListaPresenca = () => {
  const alunos = [
    'Ana Julia Machado de Moura',
    'Ana Laura Baptista Corrêa',
    'Ana Luiza Ferreira Bernardo',
    'Arthur de Oliveira Bonifácio',
    'Arthur Henrique Soares Gitirana Ferreira',
    'Davi Guilherme Chaves Dias',
    'Emanuelly Oliveira Danezzi',
    'Enzo Castro Miranda',
    'Gustavo Santos Oliveira',
    'Isaque Mendes Antunes',
    'Izabella Estrela Bastos',
    'João Pedro Monteiro Celestino',
    'Laura Beatriz da Silva Santos',
    'Laura de Oliveira Bonifácio',
    'Laura Diniz Duraes Rodrigues',
    'Marina Aparecida Cordeiro Lima',
    'Miguel Silva Borges',
    'Samuel Vieira Ataide'
  ];

  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

  const horariosSemana = [
    ['Ciências', 'Geografia', 'Escola Int.', 'Matemática', 'Português', 'Prod. Texto'],
    ['Ciências', 'Ciências', 'Matemática', 'História', 'Inglês'],
    ['Matemática', 'Ed. Física', 'Inglês', 'Português', 'Geografia'],
    ['Ed. Física', 'Arte', 'Português', 'Inglês', 'Matemática'],
    ['Mind Makers', 'Português', 'História', 'História', 'Inglês']
  ];

  const disciplinas = ['Português', 'Matemática', 'Ciências', 'História', 'Geografia', 'Inglês', 'Arte', 'Educação Física', 'Prod. Texto', 'Mind Makers'];

  const [presencas, setPresencas] = useState(
    alunos.map(() => diasSemana.map(() => false))
  );

  const [disciplinasPerdidas, setDisciplinasPerdidas] = useState(
    alunos.map(() => Array(disciplinas.length).fill(0))
  );

  const handlePresencaChange = (alunoIndex: any, diaIndex: any) => {
    const updatedPresencas = presencas.map((alunoPresenca, index) =>
      index === alunoIndex
        ? alunoPresenca.map((isChecked, index) => (index === diaIndex ? !isChecked : isChecked))
        : alunoPresenca
    );
    setPresencas(updatedPresencas);

    const updatedDisciplinasPerdidas = updatedPresencas.map((presenca, index) => {
      if (index === alunoIndex) {
        const disciplinasFaltas = Array(disciplinas.length).fill(0);
        diasSemana.forEach((dia, diaIndex) => {
          if (presenca[diaIndex]) {
            horariosSemana[diaIndex].forEach((materia) => {
              const disciplinaIndex = disciplinas.indexOf(materia);
              if (disciplinaIndex !== -1) {
                disciplinasFaltas[disciplinaIndex]++;
              }
            });
          }
        });
        return disciplinasFaltas;
      } else {
        return disciplinasPerdidas[index];
      }
    });
    setDisciplinasPerdidas(updatedDisciplinasPerdidas);
  };

  return (
    <div>
      <h1>Tabela de Chamada 6° ano</h1>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Alunos</th>
            {diasSemana.map((dia, index) => (
              <th key={index} className="border px-4 py-2">{dia}</th>
            ))}
            <th className="border px-4 py-2">Disciplinas Perdidas</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, alunoIndex) => (
            <tr key={alunoIndex}>
              <td className="border px-4 py-2">{aluno}</td>
              {diasSemana.map((dia, diaIndex) => (
                <td key={diaIndex} className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={presencas[alunoIndex][diaIndex]}
                    onChange={() => handlePresencaChange(alunoIndex, diaIndex)}
                  />
                </td>
              ))}
              <td className="border px-4 py-2">
                {disciplinas.map((disciplina, disciplinaIndex) => (
                  <div key={disciplinaIndex}>
                    {disciplina}: {disciplinasPerdidas[alunoIndex][disciplinaIndex]}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPresenca;
