as a Siebel Developer, you should be aware that in new versions we can't Business services directly in OpenUI without declaring them in Application Userproperties.
    
    Application UserPropery
      [ userPropertyName = ClientBusinessService1, UserPropertyValue=Siebel Operation BS]
      

    1. Business Service: Siebel Operation BS
        a. fn : InvokeServiceMethod
        b. we have written our custom logic to invoke any WF / BS from Open UI by using this bs. for future any such operation is required then we can reuse this without declaring the new BS in Application userproperties
        in the given code also, by using this BS we are invoking client side BS: WS Runtime BS
   
    2. Business Service: WS Runtime BS
        fn : InspectDevWS
        fn : InspectWS
        these functions I have added here individually..
        
        
        Note: 'Siebel Operation BS' was already added to Application user properties, Hence i have add new function to support any BS can invoke from PM/PR file

      
        
