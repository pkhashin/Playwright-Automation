pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                echo "Checking out source code..."
                git branch: 'main', url: 'https://github.com/pkhashin/Playwright-Automation'

                echo "Installing npm dependencies..."
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Test') {
            steps {
                echo "Running Playwright tests..."
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Publish Report') {
            steps {
                echo "Publishing Playwright HTML report..."
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
        success {
            echo '✅ Tests completed successfully.'
            
        }

        failure {
            echo '❌ Tests failed!'
        
        }

        always {
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
