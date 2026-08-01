function InspectWS(Inputs, Outputs)
{
	var name = Inputs.GetProperty("Name");
	var bInspect = "Y"; //(Inputs.GetProperty("Inspect") == "Y");
	var iLimit = ToNumber(Inputs.GetProperty("Limit"));
	var res = "",
		sWS = "";
	var errMsg = "";
	var bo = TheApplication().GetBusObject("Workspace");
	var bc = bo.GetBusComp("Repository Workspace");
	var ss = "";
	//var repId = RepositoryId();
	if(name == "")
	{
		ss = '[Created By] = LoginId () AND [Status] <> "Delivered" AND [Repository Id] = RepositoryId()';
	}
	else if(name.match(/\[.*\]/g))
	{
		ss = name;
	}
	else
	{
		ss = '[Name] like "' + name + '" AND [Repository Id] = RepositoryId()';
	}
	try
	{
		bc.SetSearchExpr(ss);
		bc.SetViewMode(AllView);
		bc.SetSortSpec("Updated(DESC)");
		bc.ExecuteQuery(ForwardBackward);
		var h = bc.FirstRecord();
		if(h)
		{
			if(bInspect)
			{
				bc.InvokeMethod("OpenWS");
				bc.InvokeMethod("PreviewWS");
				sWS = bc.GetFieldValue("Name");
			}
			else
			{
				var aWS = [];
				var i = 1;
				while(h && i <= iLimit)
				{
					aWS.push(bc.GetFieldValue("Name"));
					h = bc.NextRecord();
					i++;
				}
				sWS = aWS.join(",");
			}
		}
		else
		{
			res = "No workspace found with SearchSpec: " + ss;
			errMsg = "workspace not found with: " + "\n" + name;
		}
	}
	catch (e)
	{
		res = "Error happened inspecting a workspace with SearchSpec: " + ss + " : " + "\n" + e.toString();
	}
	finally
	{
		bc = null;
		bo = null;
	}
	Outputs.SetProperty("Result", res);
	Outputs.SetProperty("Error", res); //ErrMsg
	Outputs.SetProperty("ErrMsg", errMsg); //ErrMsg
	Outputs.SetProperty("Workspaces", sWS);
}
