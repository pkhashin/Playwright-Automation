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

       stage('Publish HTML Report') {
         steps {
        publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Test Report'
        ])
    }
}
    }

    post {
        always {
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
