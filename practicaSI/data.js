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
      },
      {
        id: 'lin-6',
        title: 'Monitorización de Procesos',
        desc: 'Usa el comando <code>ps</code> para visualizar los procesos que se están ejecutando actualmente en el sistema.',
        difficulty: 'Básica',
        hint: 'ps',
        validate: (state, cmd) => cmd.trim() === 'ps',
        successMsg: 'Visualización de procesos completada.'
      },
      {
        id: 'lin-7',
        title: 'Redirección de Salida',
        desc: 'Crea un archivo llamado <code>saludo.txt</code> que contenga el texto "Hola Mundo" usando redirección <code>></code>.',
        difficulty: 'Media',
        hint: 'echo Hola Mundo > saludo.txt',
        validate: (state) => state.fs['/saludo.txt'] && state.fs['/saludo.txt'].content.includes('Hola Mundo'),
        successMsg: 'Archivo creado mediante redirección exitosamente.'
      },
      {
        id: 'lin-8',
        title: 'Consulta de Usuarios',
        desc: 'El archivo <code>/etc/passwd</code> contiene los usuarios. Úsalo para ver la lista de cuentas del sistema.',
        difficulty: 'Básica',
        hint: 'cat /etc/passwd',
        validate: (state, cmd) => cmd.includes('cat') && cmd.includes('/etc/passwd'),
        successMsg: 'Has consultado la base de datos de usuarios.'
      },
      {
        id: 'lin-9',
        title: 'Configuración de Red',
        desc: 'Verifica la dirección IP de tu interfaz de red <code>eth0</code>.',
        difficulty: 'Básica',
        hint: 'ifconfig',
        validate: (state, cmd) => cmd === 'ifconfig',
        successMsg: 'Configuración de red verificada.'
      },
      {
        id: 'lin-10',
        title: 'Eliminación de Archivos',
        desc: 'Elimina el archivo temporal <code>cache.old</code> del directorio raíz.',
        difficulty: 'Básica',
        hint: 'rm cache.old',
        validate: (state) => !state.fs['/cache.old'],
        successMsg: 'Limpieza del sistema completada.'
      }
    ],
    initialFS: {
      '/': { type: 'dir' },
      '/documentos': { type: 'dir' },
      '/etc': { type: 'dir' },
      '/etc/passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash' },
      '/documentos/notas.txt': { type: 'file', content: 'Estudiar para el examen de mayo.' },
      '/secreto.txt': { type: 'file', content: 'Contraseña: 1234', permissions: '644' },
      '/log.txt': { type: 'file', content: 'INFO: Todo ok\nERROR: Fallo en disco\nINFO: Reinicio' },
      '/cache.old': { type: 'file', content: 'Datos obsoletos' }
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
      },
      {
        id: 'win-4',
        title: 'Configuración de Red',
        desc: 'Muestra la dirección IPv4 y otros detalles de red del equipo.',
        difficulty: 'Básica',
        hint: 'ipconfig',
        validate: (state, cmd) => cmd === 'ipconfig',
        successMsg: 'Información de red obtenida.'
      },
      {
        id: 'win-5',
        title: 'Administrador de Tareas',
        desc: 'Lista todos los procesos que se están ejecutando en Windows.',
        difficulty: 'Media',
        hint: 'tasklist',
        validate: (state, cmd) => cmd === 'tasklist',
        successMsg: 'Lista de procesos visualizada.'
      },
      {
        id: 'win-6',
        title: 'Lectura de Archivos',
        desc: 'Lee el contenido del archivo de configuración <code>config.ini</code>.',
        difficulty: 'Básica',
        hint: 'type config.ini',
        validate: (state, cmd) => cmd.includes('type') && cmd.includes('config.ini'),
        successMsg: 'Configuración leída correctamente.'
      },
      {
        id: 'win-7',
        title: 'Eliminación selectiva',
        desc: 'Elimina el archivo temporal <code>temp.tmp</code>.',
        difficulty: 'Básica',
        hint: 'del temp.tmp',
        validate: (state) => !state.fs['\\temp.tmp'],
        successMsg: 'Archivo temporal eliminado.'
      }
    ],
    initialFS: {
      '\\': { type: 'dir' },
      '\\Users': { type: 'dir' },
      '\\config.ini': { type: 'file', attrs: [], content: '[Settings]\nTheme=Dark\nAutoSave=True' },
      '\\autoexec.bat': { type: 'file' },
      '\\temp.tmp': { type: 'file', content: 'temporary data' }
    }
  }
};
