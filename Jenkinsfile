pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repository.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'yarn install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'yarn test'
                }
            }
        }
    }

    post {
        always {
            cleanWs() 
        }

        success {
            echo 'Tests passed successfully!'
        }

        failure {
            echo 'Tests failed. Check the logs for more details.'
        }
    }
}
