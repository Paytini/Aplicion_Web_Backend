const estudiantes = [
  { id: 1, matricula: '12345', nombre: 'Jonathan Granados', cursos: [1, 2] },
  { id: 2, matricula: '12346', nombre: 'Kevin Hijo', cursos: [2] },
  { id: 3, matricula: '12347', nombre: 'Laura Pérez', cursos: [1] },
];

function findAll() {
  return estudiantes;
}

function findById(id) {
  return estudiantes.find(estudiante => estudiante.id === id);
}

function findByMatricula(matricula) {
  return estudiantes.find(estudiante => estudiante.matricula === matricula);
}

function add(estudiante) {
  estudiantes.push(estudiante);
}

function save(id, data) {
  const index = estudiantes.findIndex(estudiante => estudiante.id === id);
  if (index !== -1) {
      estudiantes[index] = { ...estudiantes[index], ...data };
      return true;
  }
  return false;
}

function deleteById(id) {
  const index = estudiantes.findIndex(estudiante => estudiante.id === id);
  if (index !== -1) {
      estudiantes.splice(index, 1);
      return true;
  }
  return false;
}

function inscribirEnCurso(estudianteId, cursoId) {
  const estudiante = findById(estudianteId);
  if (estudiante && !estudiante.cursos.includes(cursoId)) {
      estudiante.cursos.push(cursoId);
      return true;
  }
  return false;
}

function eliminarDeCurso(estudianteId, cursoId) {
  const estudiante = findById(estudianteId);
  if (estudiante) {
      estudiante.cursos = estudiante.cursos.filter(curso => curso !== cursoId);
      return true;
  }
  return false;
}

module.exports = {
  findAll,
  findById,
  findByMatricula,
  add,
  save,
  deleteById,
  inscribirEnCurso,
  eliminarDeCurso,
};
