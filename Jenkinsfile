pipeline {
    agent { docker { image 'node:12-alpine' } }
    
    stages {
    
        stage('Prepare environment') {
            steps {
		apt-get update     
		apt-get install python2.7    
		ln -s /usr/bin/python2.7 /usr/bin/python 
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
