    /// reference types="cypress" />
    
    describe('Game Controller', () => {
        it('createNewGame', () => {
            cy.request({
                url: 'https://simo-hangman-game.herokuapp.com/hangman/game',
                method: 'POST',
                body: {
                    
                }
                
            }).as('response')
            
            
            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.not.be.empty
                expect(res.body).to.have.property('gameResult', 'ONGOING')
            })
            
        })
        
        it('guessLetter', () => {
            cy.request({
                url: 'https://simo-hangman-game.herokuapp.com/hangman/game/09884efd-d1da-4b5b-8afc-d39e2e626bc9',
                method: 'POST',
                body: {
                    "letter": "A"
                }
                
            }).as('response')
            
            
            cy.get('@response').then(res => {
                
                expect(res.status).to.be.equal(200)
                expect(res.body).to.not.be.empty
                cy.get('@response').its('body.guesses').should('contains', 'A')
                expect(res.body).to.have.property('gameStatus', '___A______')
                expect(res.body).to.have.property('gameResult', 'ONGOING')
            })
            
        })
        
        it('getHangmanWords', () => {
            cy.request({
                url: 'https://simo-hangman-game.herokuapp.com/hangman/game/available-words',
                method: 'GET',
                
            }).as('response')
            
            cy.get('@response').then(res => {
                
                expect(res.status).to.be.equal(200)
                expect(res.body).to.not.be.empty
                expect(res.body).to.have.property('maxMissesAllowed', 7)
                cy.get('@response').its('body.word_list').should('contains', 
                'DELL',
                'DELIVER',
                'TECHNOLOGY',
                'CUSTOMER',
                'CLOUD',
                'COMPUTER',
                'SERVER',
                'ADVANCED',
                'STORAGE',
                'SOLLUTIONS',
                'COMMITMENT',
                'DIVERSITY',
                'ENGAGEMENT',
                'COMMUNITY',
                'MILESTONE')
                
            })
            
        })
        
    })
    
