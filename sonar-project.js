import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner(
    {
        options: {
            'sonar.proyectKey': 'anthonycruzsulcaray_reto-swapi-node-aws',
            'sonar.proyectName': 'reto-swapi-node-aws',
            'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.sources': 'src',
            'sonar.tests': 'src',
            'sonar.inclusions': 'src/**/*.ts', // Entry point of your code
            'sonar.exclusions':'src/app.module.ts,src/main.ts,src/**/*.module.ts,src/_config/**,src/utils/**,src/*.ts,src/database/*.ts,src/test/**',
            'sonar.language':'typescript',
            'sonar.test.inclusions':'src/**/*.spec.ts,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.host.url':process.env.SONAR_URL,
            'sonar.login':process.env.SONAR_LOGIN_TOKEN,
        },
    },
    () => {
        console.log('Done Coverage');
    },
);