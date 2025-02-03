pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/Dan0Silva/testing-jenkins.git'
    }

    stages {
        // Primeiro, fazemos o checkout da nova branch
        stage('Checkout Nova Branch') {
            steps {
                // Verifica qual branch foi criada
                git branch: 'dev', credentialsId: '06cdcd20-c171-4921-802e-a49a2409f917', url: 'git@github.com:Dan0Silva/testing-jenkins.git'
            }
        }

        // Rodando os testes na nova branch
        stage('Rodar Testes na Nova Branch') {
            steps {
                sh 'npm install'    // Comando para instalar dependências, se necessário
                sh 'npm run test'       // Comando para rodar os testes
            }
        }

        // Se os testes na development passarem, enviamos para a main
        stage('Enviar para Master') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    sh 'git checkout master'
                    sh 'git merge dev'
                    sh 'git push origin master'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline executada.'
        }

        success {
            echo 'Todos os testes passaram, merge realizado com sucesso.'
        }

        failure {
            echo 'Testes falharam, o merge não foi realizado.'
        }
    }
}

