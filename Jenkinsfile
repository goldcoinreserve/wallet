pipeline {
    agent { docker { image 'node:12-alpine' } }
    
    stages {
    
        stage('Prepare environment') {
            steps {
                sh 'export WEB=true'
                sh 'echo $WEB'
           }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }        
    }
}
