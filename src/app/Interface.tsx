import { useState} from "react";


const Interface = () => {
  const [input1, setInput1] = useState<string>('');
  const [output1, setOutput1] = useState<string>('');
  const [output2, setOutput2] = useState<string>('');
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);

  //Langbase API call for Prospector Pipe
  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
	  setIsLoading1(true);
    try {
      const response = await fetch('https://api.langbase.com/beta/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY1}`,
        },
        body: JSON.stringify({ variables: [
			{name: 'content', value: input1} 
	]}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data1 = await response.json();
	  const responseData1 = data1.completion || 'No description available.';
      setOutput1(responseData1); 
    } catch (error) {
      console.error('Error:', error);
    }finally {
		setIsLoading1(false); 
	  }
  };

  //Langbase API call for Emails Pipe
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
	  setIsLoading2(true);
    try {
      const response = await fetch('https://api.langbase.com/beta/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY2}`,
        },
        body: JSON.stringify({ variables: [
			{name: 'list', value: output1} 
	]}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data2 = await response.json();
	  const responseData2 = data2.completion || 'No description available.';
      setOutput2(responseData2); 
    } catch (error) {
      console.error('Error:', error);
    }finally {
		setIsLoading2(false); 
	  }
  };  
  
  
  
  
  return (
    
    //Grid of 3 columns
    <div className="grid grid-cols-3 h-screen w-screen bg-muted">
      
      {/*Column 1: Card for input */}
      <div className="flex justify-center items-center">
        <div className="bg-background  p-6 rounded-xl shadow-lg border-2 border-border" style={{ width: "375px", height: "700px" }}>
          
          {/* Input label */}
            <div className="flex justify-center">
              <button className="font-mono px-4 py-2 mb-4 bg-black  text-foreground font-semibold rounded-md">
                INPUT
              </button>
            </div>
            
            {/* Description below Button */}
            <p className="text-foreground text-center mb-4 font-sans">
              Paste your content from which you want to prospect in the space below.
            </p>

            {/* Output Text Area */}
            <textarea
              value={input1}
              onChange={(e) => {
              setInput1(e.target.value);
              console.log("Input:", e.target.value); // Log input value
              }}
              className="placeholder:text-center placeholder:italic placeholder:text-muted-foreground font-sans w-full p-2 border-2 border-border rounded-xl  bg-muted text-foreground overflow-auto focus:outline-none"
              rows = {21}
              placeholder="Paste content here..."
          
            />

        </div>
      </div>

      {/*Column 2: Card for input */}
      <div className="flex justify-center items-center">
        <div className="bg-background  p-6 rounded-xl shadow-lg border-2 border-border" style={{ width: "375px", height: "700px" }}>
          
          {/* Button for Prospecting */}
          <div className="flex justify-center">
            <button 
              type = "button"
              onClick={handleSubmit1}
              className="font-mono px-4 py-2 mb-4 bg-black  text-foreground font-semibold rounded-md">
              PROSPECT
              </button>
          </div>
        
        {/* Description below Button */}
          <p className="text-foreground text-center mb-4 font-sans">
            Press the button above to generate a list of potential customer companies.
          </p>

        {/* Prospecting List Output */}
          <textarea
            value = {isLoading1 ? 'AI is Processing...' : output1}
            className= "placeholder:text-center placeholder:italic placeholder:text-muted-foreground font-sans w-full p-2 border-2 border-border rounded-xl  bg-muted text-foreground overflow-auto focus:outline-none"
            rows = {21}
            placeholder="Press Prospect to generate output..."
            readOnly
          />

        </div>
      </div>
      
      {/*Column 1: Card for input */}
      <div className="flex justify-center items-center">
        <div className="bg-background  p-6 rounded-xl shadow-lg border-2 border-border" style={{ width: "375px", height: "700px" }}>
          
          {/* Button for Emails */}
          <div className="flex justify-center">
            <button
              type = "button"
              onClick={handleSubmit2}
              className="font-mono px-6 py-2 mb-4 bg-black  text-foreground font-semibold rounded-md">
              EMAILS 
            </button>
          </div>
          
          {/* Description below Button */}
          <p className="text-foreground text-center mb-4 font-sans">
            Press the button above to generate sign-up emails for the prospected comppanies.
          </p>

          {/* Emails Output*/}
          <textarea
            value = {isLoading2 ? 'AI is Processing...' : output2}
            className=" placeholder:text-center placeholder:italic placeholder:text-muted-foreground font-sans w-full p-2 border-2 border-border rounded-xl  bg-muted text-foreground overflow-auto focus:outline-none"
            rows = {21}
            placeholder="Press Emails to generate output..."
            readOnly
          />

        </div>
      </div>
    </div>
  );
};

export default Interface;
