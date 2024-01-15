pipeline {
  agent any
  tools {nodejs "Node"}
  stages {
    stage('Clone Repository'){
      steps{
        git branch: 'main',
            url: 'https://github.com/syedarifiqbal/stock.git'
      }
    }
    stage('Install Dependencies'){
      steps {
        bat 'npm install'
      }
    }
    stage('Install PM2'){
      steps {
        bat 'npm install -g pm2'
      }
    }
    stage('Deploy'){
      steps {
        bat 'pm2 startOrRestart dev'
      }
    }
  }
}
