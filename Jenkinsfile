pipeline {
  agent any
  tools {nodejs "NodeJS-20.10.0"}
  stages {
    stage('Clone Repository'){
      steps{
        git branch: 'main',
            url: 'https://github.com/syedarifiqbal/stock.git'
      }
    }
    stage('Install Dependencies'){
      steps {
        sh 'npm install'
      }
    }
    stage('Install PM2'){
      steps {
        sh 'npm install -g pm2'
      }
    }
    stage('Deploy'){
      steps {
        sh 'npm run build'
        sh 'node dist/app.js'
      }
    }
  }
}
