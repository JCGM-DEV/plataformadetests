const DATA = {
  linux: {
    unit: 'GNU/Linux Bash',
    challenges: [
      {
        id: 'lin-1',
        title: 'Exploración Básica',
        desc: 'Usa el comando <code>ls</code> para ver los archivos del directorio actual y luego <code>cd</code> para entrar en la carpeta "documentos".',
        difficulty: 'Básica',
        hint: 'ls (listar) y cd documentos (cambiar directorio).',
        validate: (state, cmd) => state.cwd === '/documentos',
        successMsg: '¡Bien! Has navegado con éxito.'
      },
      {
        id: 'lin-2',
        title: 'Creación de Estructura',
        desc: 'Crea una carpeta llamada "proyectos" y dentro de ella otra llamada "examen".',
        difficulty: 'Básica',
        hint: 'mkdir proyectos && cd proyectos && mkdir examen',
        validate: (state) => state.fs['/proyectos'] && state.fs['/proyectos/examen'],
        successMsg: 'Jerarquía creada correctamente.'
      },
      {
        id: 'lin-3',
        title: 'Gestión de Permisos (chmod)',
        desc: 'Tienes un archivo llamado "secreto.txt". Dale permisos de lectura y escritura para el dueño, y nada para el resto (octal 600).',
        difficulty: 'Media',
        hint: 'chmod 600 secreto.txt',
        validate: (state) => state.fs['/secreto.txt']?.permissions === '600',
        successMsg: 'Permisos protegidos. ¡Buen trabajo de seguridad!'
      },
      {
        id: 'lin-4',
        title: 'Filtrado con Grep',
        desc: 'Busca la palabra "ERROR" en el archivo "log.txt".',
        difficulty: 'Media',
        hint: 'grep "ERROR" log.txt',
        validate: (state, cmd) => cmd.includes('grep') && cmd.includes('ERROR') && cmd.includes('log.txt'),
        successMsg: 'Has filtrado los errores correctamente.'
      },
      {
        id: 'lin-5',
        title: 'Tuberías (Pipes)',
        desc: 'Lista todos los archivos de la carpeta actual y filtra aquellos que contengan "txt" en su nombre.',
        difficulty: 'Avanzada',
        hint: 'ls | grep txt',
        validate: (state, cmd) => cmd.includes('|') && cmd.includes('ls') && cmd.includes('grep'),
        successMsg: 'Dominas las tuberías. ¡Eficiencia pura!'
      }
    ],
    initialFS: {
      '/': { type: 'dir' },
      '/documentos': { type: 'dir' },
      '/documentos/notas.txt': { type: 'file', content: 'Estudiar para el examen de mayo.' },
      '/secreto.txt': { type: 'file', content: 'Contraseña: 1234', permissions: '644' },
      '/log.txt': { type: 'file', content: 'INFO: Todo ok\nERROR: Fallo en disco\nINFO: Reinicio' }
    }
  },
  windows: {
    unit: 'Windows CMD',
    challenges: [
      {
        id: 'win-1',
        title: 'Listado y Navegación',
        desc: 'Usa <code>dir</code> para ver el contenido y entra en la carpeta "Users".',
        difficulty: 'Básica',
        hint: 'dir y luego cd Users',
        validate: (state) => state.cwd === '\\Users',
        successMsg: 'Navegación por Windows completada.'
      },
      {
        id: 'win-2',
        title: 'Atributos de Archivo',
        desc: 'Haz que el archivo "config.ini" sea de solo lectura usando el comando <code>attrib</code>.',
        difficulty: 'Media',
        hint: 'attrib +r config.ini',
        validate: (state) => state.fs['\\config.ini']?.attrs?.includes('R'),
        successMsg: 'Archivo protegido contra escritura.'
      },
      {
        id: 'win-3',
        title: 'Árbol de Directorios',
        desc: 'Crea la ruta "C:\\Backup\\Enero".',
        difficulty: 'Básica',
        hint: 'md Backup\\Enero',
        validate: (state) => state.fs['\\Backup\\Enero'],
        successMsg: 'Directorios creados al estilo Windows.'
      }
    ],
    initialFS: {
      '\\': { type: 'dir' },
      '\\Users': { type: 'dir' },
      '\\config.ini': { type: 'file', attrs: [] },
      '\\autoexec.bat': { type: 'file' }
    }
  }
};
