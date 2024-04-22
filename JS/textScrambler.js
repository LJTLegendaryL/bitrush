class Scramble {

	textElement = null;
	
	originalMessage = "";
	#generatedMessage = "";

	scramblePerLetter = 0;
	delayBetweenScramble = 0.0;

	ignoreTheseCharacters = [' '];
	#scramblesDone = 0;
	#skipScramble = false;

	#c = 0;

	#lower = "etaoinsrhldcumfpgwybvkxjqz";
	#upper = "ETAOINSRHLDCUMFPGWYBVKXJQZ";
	
	originalChar = null;

	constructor (element, message, scrambles, delay, ignore)
	{
		this.textElement = element;
		this.originalMessage = message;
		this.scramblePerLetter = scrambles;
		this.delayBetweenScramble = delay;
		this.ignoreTheseCharacters = ignore;

		this.Initialize();
	}

	Initialize()
	{
		this.#scramblesDone = 0;
		this.#c = 0;
		
		this.textElement.innerText = " ";
		this.#generatedMessage = " ";
		
		setTimeout(() => {
			this.ScrambleMessage();
		}, 10);
	}

	ScrambleMessage()
	{
		if(this.#c > this.originalMessage.length - 1)
			return;
		
		this.originalChar = this.originalMessage[this.#c];
		var comparison = this.originalChar == this.originalChar.toUpperCase() ? this.#upper : this.#lower;

		for (let i = 0; i < this.ignoreTheseCharacters.length; i++) {
			if(this.originalChar == this.ignoreTheseCharacters[i])
				this.#skipScramble = true;
			
			if(this.#skipScramble)
				break;
		}

		if(this.#skipScramble)
		{
			this.#skipScramble = false;
			this.SetGeneratedText();
			this.ScrambleMessage();
			return;
		}
		else
		{
			if(this.#scramblesDone < this.scramblePerLetter)
			{
				this.#scramblesDone++;
				var randomLetter = comparison[parseInt(Math.random() * (comparison.length - 1))];

				this.textElement.innerText = this.#generatedMessage + randomLetter;
				
				setTimeout(() => {
					this.ScrambleMessage();
				}, this.delayBetweenScramble * 1000);

				return;
			}
			else
			{
				this.#scramblesDone = 0;
				this.SetGeneratedText();
			}

			if(this.#c < this.originalMessage.length)
				this.ScrambleMessage();
		}
	}
	
	SetGeneratedText()
	{
		this.#generatedMessage += this.originalChar;
		this.textElement.innerText = this.#generatedMessage;

		this.#c++;
	}
}