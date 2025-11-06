pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/pkhashin/Playwright-Automation'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Generate Report') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
