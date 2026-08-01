
function InspectDevWS(Inputs, Outputs)
{
    //Indrasen: 2025Aug31: to easy inspect dev workspace from PM PR
	var bo = TheApplication().GetBusObject("Workspace");
	var bc = bo.GetBusComp("Repository Workspace");
	var name = Inputs.GetProperty("Name");
	var sSpec = "", bInspect = "Y", rMsg  = "", errMsg="";
	var sWS = "", aWS = "", i = 1;
	
	if(name == "")
	{	
		var Login = TheApplication().GetProfileAttr("Login Name");
		Login = Login.toLowerCase();
		name = "dev_"+Login+"*";
		bInspect = "N";
	}
	var test = name.indexOf("*");
	if(test >= 0)
	{
		bInspect = "N";
		sSpec = "[Name] Like '"+name+"' AND [Status] <> 'Delivered' ";
	}
	else
		sSpec ="[Name] = '"+name +"'";
	
	Outputs.SetProperty("*test*", test);
	Outputs.SetProperty("sSpec", sSpec);
	try
	{
		bc.SetSearchExpr(sSpec);
		bc.SetViewMode(AllView);
		bc.SetSortSpec("Updated(DESC)");
		bc.ExecuteQuery(ForwardBackward);
		var rec = bc.FirstRecord();
		if(rec)
		{
			if(bInspect == "Y")
			{
				bc.InvokeMethod("OpenWS");
				bc.InvokeMethod("PreviewWS");
				sWS = bc.GetFieldValue("Name");
			}
			else
			{
				while(rec && i <= 10)
				{
					if(aWS=="")
						aWS=bc.GetFieldValue("Name");
					else
						aWS += "|"+bc.GetFieldValue("Name");
					rec = bc.NextRecord();
					i++;
				}
				
			}
		}
		else
		{
			rMsg = "No workspace found with SearchSpec: " + sSpec;
			errMsg = "workspace not found with: " + "\n" + name;
		}
	}
	catch (e)
	{
		rMsg = "Error happened inspecting a workspace with SearchSpec: " + sSpec + "\n" + e.toString();
	}
	finally
	{
		bc = null;
		bo = null;
		Outputs.SetProperty("ErrorMsg", rMsg);
		Outputs.SetProperty("Error", rMsg); //ErrMsg
		Outputs.SetProperty("ErrMsg", errMsg); //ErrMsg
		Outputs.SetProperty("WorkspacesString", sWS);
		Outputs.SetProperty("Workspaces", aWS);
	}
}
