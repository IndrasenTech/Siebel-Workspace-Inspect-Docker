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



        
    WorkspaceInspectDock.js
    this file has to be added to Application Manifest.
    1. Adminitstration-Application > Manifest files
            here we need to add the Filename

    2. i have added screen shot         
     
      <img width="1305" height="657" alt="image" src="https://github.com/user-attachments/assets/d9abaff0-caff-4ee3-90d9-bd4e508772f5" />
      <img width="1314" height="647" alt="image" src="https://github.com/user-attachments/assets/95ade630-7806-4690-afb5-ba3e9fae0a66" />
      <img width="509" height="427" alt="image" src="https://github.com/user-attachments/assets/56e2e324-93fa-4861-8ddc-9e171153dd32" />

        <img width="493" height="311" alt="image" src="https://github.com/user-attachments/assets/49c46713-7795-4c45-bcaf-bfcabfec565b" />



        
