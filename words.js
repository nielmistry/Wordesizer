var words = ['wavy', 'scratchy', 'squeaky', 'calm', 'quick', 'retro', 'creepy', 'jazz', 'crunchy', 'echo'];
var similarWord;

const MAX = 50;
function getJSON(word, max)
{

}	
function findSimilar(word, callback) {
	if(!words.includes(word))
	{
		console.log("IN NOT");
		var found = false;
		var returnedWords;
		var requestURL = 'https://api.datamuse.com/words?ml=' + word + '&max=' + MAX;
		var request = new XMLHttpRequest();
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();


		request.onload = function()
		{
			returnedWords = request.response;
			for(var i = 0 in returnedWords)
			{
				if(words.includes(returnedWords[i].word))
				{
					similarWord = returnedWords[i].word;
					found = true;
				}	
			}
			if(!found)
			{
				similarWord = "#";
			}
			console.log(similarWord);
			callback(similarWord);
		}

	}
	else
	{		
		similarWord = word;
		callback(similarWord);
	}
}
