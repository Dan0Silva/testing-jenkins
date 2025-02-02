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
                git url: "${GITHUB_REPO}", branch: "${env.BRANCH_NAME}"
            }
        }

        // Rodando os testes na nova branch
        stage('Rodar Testes na Nova Branch') {
            steps {
                sh 'npm install'    // Comando para instalar dependências, se necessário
                sh 'npm run test'       // Comando para rodar os testes
            }
        }

        // Se os testes da nova branch passarem, enviamos para a branch development
        stage('Enviar para Development') {
            steps {
                script {
                    sh 'git checkout development'
                    sh 'git merge ${env.BRANCH_NAME}'
                    sh 'git push origin development'
                }
            }
        }

        // Rodar os testes na branch development, incluindo os testes da nova branch
        stage('Rodar Testes em Development') {
            steps {
                sh 'npm install'
                sh 'npm run test'  // Rodando todos os testes da branch development e da nova branch
            }
        }

        // Se os testes na development passarem, enviamos para a main
        stage('Enviar para Main') {
            when {
                branch 'development'
            }
            steps {
                script {
                    sh 'git checkout main'
                    sh 'git merge development'
                    sh 'git push origin main'
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

