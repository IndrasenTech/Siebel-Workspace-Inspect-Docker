function InvokeServiceMethod(Inputs, Outputs)
{
	// Indrasen: BSS2026 : It can invoke any BS ( ClientSide OR repo BS )
	// Extract service/method name arguments
	var sBS = "", sMethod = "";
	sBS = Inputs.GetProperty("Service");
	sMethod = Inputs.GetProperty("Method");
	
	Inputs.RemoveProperty("Service");
	Inputs.RemoveProperty("Method");
	
	var bsSRVC;
	try
	{
		// invoke BS
		bsSRVC = TheApplication().GetService(sBS);
		bsSRVC.InvokeMethod(sMethod, Inputs, Outputs);
	}
	catch (e)
	{
		throw e;
	}
	finally
	{
		bsSRVC = null;
	}
	return (CancelOperation);
}
