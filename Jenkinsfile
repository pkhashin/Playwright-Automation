pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                git branch: 'main', url: 'https://github.com/pkhashin/Playwright-Automation'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Playwright tests..."
                bat 'npx playwright test --reporter=html'
            }
        }

       stage('Publish HTML Report') {
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
        sucess {
            echo 'Tests completed successfully.'
        }
        always {
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
