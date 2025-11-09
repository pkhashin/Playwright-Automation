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
            emailext(
                subject: "✅ Playwright Tests Passed - Build #${env.BUILD_NUMBER}",
                body: """
                    <p>All Playwright tests passed successfully!</p>
                    <p><a href="${env.BUILD_URL}">View Jenkins Build Details</a></p>
                    <p><a href="${env.BUILD_URL}HTML_20Report/">View Playwright HTML Report</a></p>
                """,
                to: 'pkhashin@gmail.com'
            )
        }

        failure {
            echo '❌ Tests failed!'
            emailext(
                subject: "❌ Playwright Tests Failed - Build #${env.BUILD_NUMBER}",
                body: """
                    <p>Some tests have failed in Playwright execution.</p>
                    <p><a href="${env.BUILD_URL}">Check the Jenkins logs</a></p>
                """,
                to: 'pkhashin@gmail.com'
            )
        }

        always {
            archiveArtifacts artifacts: '**/playwright-report/**', fingerprint: true
        }
    }
}
