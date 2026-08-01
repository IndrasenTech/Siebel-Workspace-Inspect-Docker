// -- Author: INDRASEN GADDAM -- workspaceInspectDock.js
if (typeof (SiebelAppFacade) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade");
}

(function () {
    const FUNC_NAME = "SiebelInspectWS";
    const WF_NAME = "STC WORKSPACE INSPECT WF";

		// ─── INJECT PROFESSIONAL STYLES ──────────────────────────────────────────
		function injectFocusStyles() {
			if (document.getElementById("wsInspectStyles")) return;

			const style = document.createElement("style");
			style.id = "wsInspectStyles";
			style.textContent = `
				@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

				/* ── Dialog shell ───────────────────────────────────────────────── */
				#inspectDialog.ui-dialog-content,
				.ui-dialog:has(#inspectDialog) {
					font-family: 'Inter', sans-serif !important;
				}

				.ui-dialog:has(#inspectDialog) {
					border: none !important;
					border-radius: 12px !important;
					box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.08) !important;
					overflow: hidden !important;
					padding: 0 !important;
				}

				/* ── Title bar ──────────────────────────────────────────────────── */
				.ui-dialog:has(#inspectDialog) .ui-dialog-titlebar {
					background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
					color: #f1f5f9 !important;
					border: none !important;
					border-radius: 12px 12px 0 0 !important;
					padding: 14px 18px !important;
					font-family: 'Inter', sans-serif !important;
					font-size: 14px !important;
					font-weight: 600 !important;
					letter-spacing: 0.3px !important;
				}

				.ui-dialog:has(#inspectDialog) .ui-dialog-title {
					color: #f1f5f9 !important;
					font-family: 'Inter', sans-serif !important;
					font-weight: 600 !important;
					font-size: 14px !important;
				}

				.ui-dialog:has(#inspectDialog) .ui-dialog-titlebar-close {
					color: #94a3b8 !important;
					background: transparent !important;
					border: none !important;
					top: 50% !important;
					transform: translateY(-50%) !important;
				}

			   /* .ui-dialog:has(#inspectDialog) .ui-dialog-titlebar-close:hover {
					color: #f1f5f9 !important;
				}
	*/
				/* ── Content area ───────────────────────────────────────────────── */
				.ui-dialog:has(#inspectDialog) .ui-dialog-content {
					background: #ffffff !important;
					padding: 24px 24px 16px !important;
					border: none !important;
				}

				/* ── Label ──────────────────────────────────────────────────────── */
				#inspectDialog label {
					display: block !important;
					font-family: 'Inter', sans-serif !important;
					font-size: 12px !important;
					font-weight: 600 !important;
					color: #475569 !important;
					text-transform: uppercase !important;
					letter-spacing: 0.6px !important;
					margin-bottom: 8px !important;
				}

				/* ── Text input ─────────────────────────────────────────────────── */
				#inspectDialog .wsInputWrap {
					position: relative !important;
					width: 100% !important;
				}

				#inspectDialog #SiebelInspectWS {
					width: 100% !important;
					padding: 10px 44px 10px 12px !important;
					font-family: 'Inter', sans-serif !important;
					font-size: 13px !important;
					color: #1e293b !important;
					background: #f8fafc !important;
					border: 1.5px solid #cbd5e1 !important;
					border-radius: 7px !important;
					outline: none !important;
					box-sizing: border-box !important;
					transition: border-color 0.2s, box-shadow 0.2s !important;
				}

				#inspectDialog #SiebelInspectWS:focus {
					border-color: #3b82f6 !important;
					box-shadow: 0 0 0 3px rgba(59,130,246,0.12) !important;
					background: #fff !important;
				}

				#inspectDialog #btnFetchWS {
					position: absolute !important;
					right: 6px !important;
					top: 50% !important;
					transform: translateY(-50%) !important;
					width: 30px !important;
					height: 30px !important;
					border: none !important;
					border-radius: 6px !important;
					background: transparent !important;
					color: #2563eb !important;
					cursor: pointer !important;
					font-size: 16px !important;
					line-height: 30px !important;
					padding: 0 !important;
				}

				#inspectDialog #btnFetchWS:hover {
					background: #eff6ff !important;
					color: #1d4ed8 !important;
				}

				/* ── Result message area ────────────────────────────────────────── */
				#wsResult {
					font-family: 'Inter', sans-serif !important;
					font-size: 13px !important;
					min-height: 22px !important;
					margin-top: 14px !important;
					padding: 0 2px !important;
					letter-spacing: 0.1px !important;
				}
				
				

/* ── Open Workspace List ─────────────────────────────────────────── */

#wsListTitle{
    margin-top:12px;
    margin-bottom:4px;
    font-family:'Inter',sans-serif;
    font-size:12px;
    font-weight:600;
    color:#475569;
    text-transform:uppercase;
    letter-spacing:.5px;
    display:none;
}

#wsList{
    margin-top:6px;
    max-height:170px;
    overflow-y:auto;
    padding:2px 0;
    font-family:'Inter',sans-serif;
    font-size:13px;
}

.wsLink{
    display:block;
    padding:3px 0;
    color:#2563eb;
    text-decoration:none;
    cursor:pointer;
    font-weight:500;
    transition:color .15s ease;
}

.wsLink:hover{
    color:#1d4ed8;
    text-decoration:underline;
}

/* ── Button Bar ─────────────────────────────────────────────────── */

.ui-dialog:has(#inspectDialog) .ui-dialog-buttonpane{
    background:#f8fafc !important;
    border-top:1px solid #e2e8f0 !important;
    padding:14px 20px !important;
    margin:0 !important;
}

.ui-dialog:has(#inspectDialog) .ui-dialog-buttonset{
    display:flex !important;
    gap:10px !important;
    justify-content:flex-end !important;
}

.ui-dialog:has(#inspectDialog) .ui-dialog-buttonset button{
    font-family:'Inter',sans-serif !important;
    font-size:13px !important;
    font-weight:500 !important;
    padding:8px 20px !important;
    border-radius:7px !important;
    background:#ffffff !important;
    color:#374151 !important;
    border:1px solid #d1d5db !important;
    box-shadow:none !important;
    cursor:pointer !important;
    outline:none !important;
    opacity:1 !important;
    transition:all .18s ease !important;
}

/* ── Inspect Button ──────────────────────────────────────────────── */

/* ── Close Button ───────────────────────────────────────────────── */

.ui-dialog:has(#inspectDialog) .ui-dialog-buttonset button:hover,
.ui-dialog:has(#inspectDialog) .ui-dialog-buttonset button:focus{
    background:#1d4ed8 !important;
    color:#ffffff !important;
    border-color:#1d4ed8 !important;
    box-shadow:0 0 0 3px rgba(147,197,253,.45) !important;
}

			`;
			document.head.appendChild(style);
		}
    // ─────────────────────────────────────────────────────────────────────────

    function injectWSStatus(wsName, loginName) {
        const header = document.getElementById("_sweappmenu");
        if (!header) return;

        const container = header.querySelector("div[title-preserved]") || header;
        if (!container) return;

        let node = document.getElementById("wsHeaderStatus");

        if (!node) {
            node = document.createElement("span");
            node.id = "wsHeaderStatus";
            Object.assign(node.style, {
                position: "absolute",
                right: "20px",
                top: "5px",
                color: "#f7e2c8",
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "4px",
                whiteSpace: "pre-line"
            });
            container.appendChild(node);
        }

        node.innerHTML = `🔑 Login: ${loginName}<br>🧪 Workspace: ${wsName}`;
    }

    function addDockButton() {
        if (document.getElementById("wsDockBtn")) return;

        const btn = document.createElement("div");
        btn.id = "wsDockBtn";
        btn.innerHTML = "🔍 Inspect DEV WS";

        Object.assign(btn.style, {
            position: "fixed",
            bottom: "10px",
            right: "10px",
            background: "#0078d7",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 9999
        });

        btn.onmouseenter = () => {
            btn.style.background = "#005a9e";
            btn.style.color = "yellow";
        };

        btn.onmouseleave = () => {
            btn.style.background = "#0078d7";
            btn.style.color = "#fff";
        };

        btn.onclick = openInspectDialog;
        document.body.appendChild(btn);
    }

    function getDlgButton(label) {
        return $(".ui-dialog-buttonset button").filter(function () {
            return $(this).text().trim() === label;
        });
    }

    function focusInspectButton() {
        getDlgButton("Inspect").trigger("focus");
        bindInputEnterToFocusedButton();
    }

    function focusCloseButton() {
        getDlgButton("Close").trigger("focus");
        bindInputEnterToFocusedButton();
    }

    function bindInputEnterToFocusedButton() {
        $("#" + FUNC_NAME)
            .off("keypress.dlg")
            .on("keypress.dlg", function (e) {
                if (e.which === 13) {
                    const $focused = $(".ui-dialog-buttonset button:focus");
                    if ($focused.length) {
                        $focused.trigger("click");
                    } else {
                        runInspect();
                    }
                }
            });
    }

    function openInspectDialog() {
        let $dlg = $("#inspectDialog");

        if ($dlg.length) {
            $dlg.dialog("open");
            $dlg.find("#wsResult").empty();
            setTimeout(focusInspectButton, 50);
            return;
        }

        const html = `
            <div id="inspectDialog" title="Inspect Workspace" style="padding:0;">
                <label for="${FUNC_NAME}">Workspace Name</label>
                <div class="wsInputWrap">
                    <input type="text" id="${FUNC_NAME}" placeholder="Enter workspace name...">
                    <button type="button" id="btnFetchWS" title="Search open workspaces" aria-label="Search open workspaces">&#128269;</button>
                </div>
				
				<div id="wsListTitle">Open Workspaces</div>
				<div id="wsList"></div>
                <div id="wsResult"></div>
            </div>`;

        $dlg = $(html).dialog({
            modal: true,
            width: 480,
            buttons: [
                { 
					text: "Inspect", 
					click: runInspect 
				},
                {
                    text: "Close",
                    click: function () { $(this).dialog("close"); }
                }
            ],
            open: function () {
                setTimeout(focusInspectButton, 50);
				$("#btnFetchWS").off("click").on("click", fetchOpenWS);
            },
            close: function () {
                $(this).hide();
            }
        });
    }
	


function fetchOpenWS() {
	const service =	SiebelApp.S_App.GetService("Siebel Operation BS");
	const ps      =	SiebelApp.S_App.NewPropertySet();
    const wsName = $("#" + FUNC_NAME).val().trim();
	ps.SetProperty("ProcessName", WF_NAME);
	ps.SetProperty("Service", "WS Runtime BS");
	ps.SetProperty("Method", "InspectDevWS");
    ps.SetProperty("Inspect", "N");
    ps.SetProperty("Name", wsName);
	$("#wsList").css("color", "#2563eb").html("Loading...");
	service.InvokeMethod("InvokeServiceMethod",	ps,	{
			async: true,
            cb: function (m, input, output) {
                var Message = "";
                var WSListOut = "";
                if (!output)
                {
                    $("#wsList").css("color", "#dc2626").text("❌ No response from workflow.");
                    setTimeout(focusCloseButton, 50);
                    return;
                }
                else
                {
                    var resultSet = output.GetChildByType("ResultSet");
                    if(resultSet)
                    {
                        Message = resultSet.GetProperty("ErrMsg");
                        WSListOut = resultSet.GetProperty("Workspaces");
				        renderWSList(WSListOut);
                    }
                }
            }
		});
}
function renderWSList(list){
    if(!list || list.trim() === ""){
        $("#wsListTitle").hide();
        $("#wsList").html("No open workspaces.");
        return;
    }
    $("#wsListTitle").show();
    var html = "";
    list.split("|").forEach(function(ws){
        ws = ws.trim();
        if(ws){
            html += "<a href='#' class='wsLink' data-ws='" + ws + "'>" +
                        ws +
                    "</a>";
        }
    });
    $("#wsList").html(html);
}

$(document).on("click", ".wsLink", function(e){
	e.preventDefault();
	var ws=$(this).data("ws");
	$("#" + FUNC_NAME).val(ws);
	runInspect();
});

    function runInspect() {
        const wsName = $("#" + FUNC_NAME).val().trim();
        if (!wsName) {
            $("#wsResult")
                .css("color", "#dc2626")
                .text("⚠️ Please enter a workspace name.");
            setTimeout(focusInspectButton, 50);
            return;
        }

        const service = SiebelApp.S_App.GetService("Siebel Operation BS");
        const ps = SiebelApp.S_App.NewPropertySet();
        var Message = "";
        var WSListOut = "";
        ps.SetProperty("ProcessName", WF_NAME);
        ps.SetProperty("WorkspaceName", wsName);
        ps.SetProperty("Service", "WS Runtime BS");
        ps.SetProperty("Method", "InspectWS");
        ps.SetProperty("Inspect", "Y");
        ps.SetProperty("Name", wsName);

        $("#wsResult")
            .css("color", "#2563eb")
            .text("⏳ Inspecting workspace…");

        service.InvokeMethod("InvokeServiceMethod", ps, {
            async: true,
            cb: function (m, input, output) {
                var Message = "";
                var WSListOut = "";
                if (!output)
                {
                    $("#wsResult").css("color", "#dc2626").text("❌ No response from workflow.");
                    setTimeout(focusCloseButton, 50);
                    return;
                }
                else
                {
                    var resultSet = output.GetChildByType("ResultSet");
                    if(resultSet)
                    {
                        Message = resultSet.GetProperty("ErrMsg");
                        WSListOut = resultSet.GetProperty("Workspaces");
                    }
                }
                if(Message != "")
                {
                    let msg = Message;
                    $("#wsResult").css("color", "#dc2626").text("❌ " + msg);
                    setTimeout(focusCloseButton, 50);
                }
                else
                {
                    injectWSStatus(wsName, SiebelApp.S_App.GetProfileAttr("Login Name"));
                    $("#wsResult").css("color", "#16a34a").text("✅ Workspace inspection complete.");
                    setTimeout(focusCloseButton, 50);
                }
            }
        });
    }

    // ─── init ─────────────────────────────────────────────────────────────────
    injectFocusStyles();
//  injectWSStatus("MAIN", SiebelApp.S_App.GetProfileAttr("Login Name"));
    setTimeout(addDockButton, 1500);
})();

