        const questions = {
            1: [
                "What's your go-to comfort food and what memory does it bring back?",
                "If you could have dinner with anyone, living or dead, who would it be and what would you ask them?",
                "What's a hobby or interest you've always wanted to try but haven't yet?",
                "What's your favorite way to spend a Sunday morning?",
                "What's a movie or book that changed how you see the world?",
                "If you could live anywhere for a year, where would you choose?",
                "What's something you're really good at that most people don't know about?",
                "What type of music do you listen to when you need to feel better?",
                "What's your favorite childhood memory?",
                "If you could master any skill instantly, what would it be?",
                "What's the best gift you've ever received and why was it meaningful?",
                "What do you do to relax after a stressful day?",
                "What's a place that feels like home to you, even if it's not where you live?",
                "What's something that always makes you laugh?",
                "What's your favorite season and why?",
                "What's a song that takes you straight back to a specific moment in your life?",
                "If you had a completely free day with no responsibilities, how would you spend it?",
                "What's a small daily ritual that means a lot to you?",
                "What's the most spontaneous thing you've ever done?",
                "What's the last thing you learned that genuinely excited you?",
                "If you could instantly become fluent in any language, which would you choose and why?",
                "What's a show, podcast, or book you've been hooked on recently and why?"
            ],
            2: [
                "What's a belief you held strongly that you've changed your mind about?",
                "What does friendship mean to you? What makes someone a true friend?",
                "What's your biggest pet peeve in relationships — romantic or platonic?",
                "Tell me about a time when you felt really proud of yourself.",
                "What's something you're working on improving about yourself?",
                "What do you value most in the people closest to you?",
                "How do you handle conflict? What's your natural response?",
                "What's a lesson you learned the hard way?",
                "What makes you feel most loved and appreciated?",
                "What's something that scares you but you want to do anyway?",
                "How do you show care for people you love?",
                "What's a quality you admire in others that you wish you had more of?",
                "What does trust mean to you? How do people earn yours?",
                "What's something people often misunderstand about you?",
                "What role do you usually play in your friend group and how do you feel about it?",
                "What's a boundary you've set that you're proud of?",
                "When do you feel most like yourself?",
                "What's something you wish more people asked you about?",
                "What habit has made the biggest positive difference in your life?",
                "What's a compliment you've received that you still think about?",
                "What does your ideal support system look like when you're going through something hard?",
                "What's something you're deeply curious about that you've never had the chance to explore?"
            ],
            3: [
                "What's your biggest fear about the future?",
                "Tell me about a time you felt truly vulnerable. How did you handle it?",
                "What's something you've never told anyone, or very few people?",
                "What do you think is your purpose in life, or what gives your life meaning?",
                "What's your relationship with your family like? How has it shaped who you are?",
                "What's the hardest decision you've ever had to make?",
                "Is there something you haven't forgiven yourself for?",
                "What does love mean to you?",
                "What's your biggest insecurity and where do you think it comes from?",
                "If you could change one thing about your past, would you? What and why?",
                "What do you think happens after we die?",
                "What's something you're struggling with right now that you don't often talk about?",
                "How do you define success for yourself, not based on what others expect?",
                "What's a wound from your past that still affects you today?",
                "What do you need more of in your life right now?",
                "What's a version of yourself you've had to let go of?",
                "When did you last feel truly at peace with who you are?",
                "What's something you've grieved that others might not expect?",
                "How has your relationship with yourself changed over the years?",
                "What does home mean to you on an emotional level?",
                "What's a conversation you keep having with yourself that you haven't resolved?",
                "What do you wish someone had told you before a major life transition?"
            ],
            4: [
                "What do you think is the biggest lie you tell yourself?",
                "If you died tomorrow, what would you regret not having said or done?",
                "What's the darkest period of your life and what did it teach you?",
                "How do you want to be remembered when you're gone?",
                "What part of yourself do you hide from most people and why?",
                "What does unconditional love look like to you? Have you experienced it?",
                "What would you do if you weren't afraid of being judged?",
                "What's a truth about yourself that you're afraid to admit?",
                "If you could give your younger self one piece of advice, what would it be?",
                "What brings you to tears? What touches your soul most deeply?",
                "What's something you've lost that you'll never get back?",
                "How has pain shaped who you are today?",
                "What do you think your purpose on this earth is?",
                "What would you want people to understand about your life experience?",
                "If we're still friends in 20 years, what do you hope we'll have shared together?",
                "What version of yourself are you most afraid to become?",
                "Is there a relationship in your life that still hurts? What does it need?",
                "What would you do differently if you trusted yourself completely?",
                "What have you been carrying alone that you've never fully put down?",
                "If your life were a story, what chapter are you in right now?",
                "What does it feel like when you betray yourself? Has that happened recently?",
                "What would radical honesty with the people you love change in your life?"
            ]
        };

        let currentLevel = 1;
        let cardsDrawn = 0;
        let usedQuestions = {1: [], 2: [], 3: [], 4: []};
        let levelLabels = {
            1: "Warm-Up",
            2: "Getting Real",
            3: "Deep Dive",
            4: "Soul Level"
        };
        let soundEnabled = true;
        let audioCtx = null;

        function getAudioContext() {
            if (!audioCtx) {
                const Ctor = window.AudioContext || window.webkitAudioContext;
                if (Ctor) audioCtx = new Ctor();
            }
            return audioCtx;
        }

        function toggleSound() {
            soundEnabled = !soundEnabled;
            const soundBtn = document.getElementById('soundBtn');
            soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
            soundBtn.setAttribute('aria-pressed', String(soundEnabled));

            if (soundEnabled) {
                playSound('level');
            }
        }

        function playSound(type) {
            if (!soundEnabled) return;

            const ctx = getAudioContext();
            if (!ctx) return;

            if (ctx.state === 'suspended') ctx.resume();

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            if (type === 'draw') {
                oscillator.frequency.setValueAtTime(400, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
            } else if (type === 'level') {
                oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
                oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
            }
        }

        function createSparkles(element) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';

                const angle = (Math.PI * 2 * i) / 8;
                const distance = 50;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;

                sparkle.style.left = x + 'px';
                sparkle.style.top = y + 'px';
                sparkle.style.position = 'fixed';

                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }
        }

        function createConfetti() {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

            for (let i = 0; i < 20; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
                confetti.style.animationDelay = Math.random() * 0.3 + 's';

                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }
        }

        function selectLevel(level) {
            currentLevel = level;
            document.getElementById('currentLevel').textContent = level;

            playSound('level');

            document.querySelectorAll('.level-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });

            const activeBtn = document.querySelector(`.level-${level}-btn`);
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-pressed', 'true');

            createSparkles(activeBtn);

            if (level === 4 && cardsDrawn > 0) {
                createConfetti();
            }
        }

        function drawCard() {
            const availableQuestions = questions[currentLevel].filter(
                (q, index) => !usedQuestions[currentLevel].includes(index)
            );

            if (availableQuestions.length === 0) {
                usedQuestions[currentLevel] = [];
                return drawCard();
            }

            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const question = availableQuestions[randomIndex];
            const originalIndex = questions[currentLevel].indexOf(question);

            usedQuestions[currentLevel].push(originalIndex);
            cardsDrawn++;

            const card = document.getElementById('questionCard');
            const cardQuestion = document.getElementById('cardQuestion');
            const cardLevel = document.getElementById('cardLevel');

            playSound('draw');
            createSparkles(card);

            card.classList.add('flipping');

            setTimeout(() => {
                card.className = `card level-${currentLevel}`;
                cardLevel.textContent = `Level ${currentLevel}: ${levelLabels[currentLevel]}`;
                cardQuestion.textContent = question;

                const statsNumber = document.getElementById('cardsDrawn');
                statsNumber.textContent = cardsDrawn;
                statsNumber.classList.add('pulse');
                setTimeout(() => statsNumber.classList.remove('pulse'), 500);

                setTimeout(() => card.classList.remove('flipping'), 100);
            }, 300);

            if (cardsDrawn === 10 || cardsDrawn === 25 || cardsDrawn === 50) {
                setTimeout(() => createConfetti(), 400);
            }
        }

        window.onload = function() {
            drawCard();
        };
