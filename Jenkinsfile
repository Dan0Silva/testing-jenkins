pipeline {
    agent any

    environment {
        GITHUB_REPO = 'git@github.com:Dan0Silva/testing-jenkins.git' // Usando URL SSH
        BRANCH_NAME = 'dev'
    }

    stages {
        // Primeiro, fazemos o checkout da nova branch
        stage('Checkout Nova Branch') {
            steps {
                // Checkout da branch que foi criada/pushed (a branch que disparou o build)
                git branch: "${env.BRANCH_NAME}", credentialsId: '06cdcd20-c171-4921-802e-a49a2409f917', url: "${env.GITHUB_REPO}"
            }
        }

        // Rodando os testes na nova branch
        stage('Rodar Testes na Nova Branch') {
            steps {
                sh 'npm install'    // Comando para instalar dependências, se necessário
                sh 'npm run test'    // Comando para rodar os testes
            }
        }

        // Se os testes na development passarem, enviamos para a main
        stage('Enviar para Master') {
            when {
                branch 'dev'  // Essa etapa só executa se o build for feito na branch dev
            }
            steps {
                script {
                    // Garantir que estamos atualizados com a branch de destino (master)
                    sh 'git checkout master'
                    sh 'git pull origin master'   // Puxar as últimas mudanças da master

                    // Agora fazemos o merge da dev para a master
                    sh 'git merge dev'

                    // Push das mudanças na master
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
