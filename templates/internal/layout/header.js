export default function() {
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
        <img
            width="101"
            height="20"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDEgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMSAyMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KPC9zdHlsZT4KPHRpdGxlPkdyb3VwIDE4PC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CjxnIGlkPSJQYWdlLTEiPgoJPGcgaWQ9IlN0YW5kYXJkLXBhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01OTguMDAwMDAwLCAtMjM0LjAwMDAwMCkiPgoJCTxnIGlkPSJHcm91cC0xOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTk4LjAwMDAwMCwgMjM0LjAwMDAwMCkiPgoJCQk8cGF0aCBpZD0iSWNvbi1TaGFwZSIgY2xhc3M9InN0MCIgZD0iTTE2LDkuMWMwLDUtMy40LDkuOC04LDEwLjljLTQuNi0xLjEtOC01LjktOC0xMC45VjMuNkw4LDBsOCwzLjZWOS4xTDE2LDkuMXogTTgsMTgKCQkJCWMzLjItMC45LDYtNC45LDYtOC44VjQuOEw4LDJWMTh6Ii8+CgkJCTxnIGNsYXNzPSJzdDEiPgoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI3LjUsMTEuM2MwLjEsMC40LDAuMiwwLjcsMC4zLDAuOWMwLjMsMC40LDAuOCwwLjUsMS41LDAuNWMwLjQsMCwwLjgsMCwxLjEtMC4xYzAuNS0wLjIsMC44LTAuNSwwLjgtMQoJCQkJCWMwLTAuMy0wLjEtMC41LTAuNC0wLjdjLTAuMy0wLjItMC43LTAuMy0xLjItMC40bC0wLjktMC4yYy0wLjktMC4yLTEuNi0wLjQtMS45LTAuN2MtMC42LTAuNC0wLjktMS0wLjktMS45CgkJCQkJYzAtMC44LDAuMy0xLjQsMC45LTEuOXMxLjQtMC44LDIuNS0wLjhjMC45LDAsMS43LDAuMiwyLjQsMC43YzAuNywwLjUsMSwxLjIsMSwyLjFIMzFjMC0wLjUtMC4zLTAuOS0wLjctMS4xCgkJCQkJYy0wLjMtMC4xLTAuNi0wLjItMS4xLTAuMmMtMC41LDAtMC45LDAuMS0xLjEsMC4zYy0wLjMsMC4yLTAuNCwwLjQtMC40LDAuOGMwLDAuMywwLjEsMC41LDAuNCwwLjdjMC4yLDAuMSwwLjYsMC4yLDEuMSwwLjQKCQkJCQlsMS41LDAuNGMwLjcsMC4yLDEuMiwwLjQsMS41LDAuNmMwLjUsMC40LDAuOCwxLDAuOCwxLjhjMCwwLjgtMC4zLDEuNC0wLjksMnMtMS41LDAuOC0yLjYsMC44Yy0xLjEsMC0yLTAuMy0yLjctMC44CgkJCQkJcy0xLTEuMi0xLTIuMUgyNy41eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM1LjgsNy42djMuOWMwLDAuNCwwLDAuNiwwLjEsMC44YzAuMiwwLjMsMC40LDAuNSwwLjksMC41YzAuNiwwLDEtMC4yLDEuMi0wLjdjMC4xLTAuMiwwLjItMC42LDAuMi0xVjcuNgoJCQkJCWgxLjdWMTRoLTEuNnYtMC45YzAsMC0wLjEsMC4xLTAuMSwwLjJjLTAuMSwwLjEtMC4xLDAuMi0wLjIsMC4zYy0wLjMsMC4yLTAuNSwwLjQtMC44LDAuNWMtMC4yLDAuMS0wLjUsMC4xLTAuOSwwLjEKCQkJCQljLTAuOSwwLTEuNi0wLjMtMS45LTFjLTAuMi0wLjQtMC4zLTAuOS0wLjMtMS43VjcuNkgzNS44eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ2LjgsOC4zYzAuNSwwLjYsMC44LDEuNCwwLjgsMi40YzAsMS4xLTAuMywyLTAuOCwyLjZzLTEuMiwwLjktMiwwLjljLTAuNSwwLTAuOS0wLjEtMS4zLTAuNAoJCQkJCWMtMC4yLTAuMS0wLjQtMC4zLTAuNS0wLjZ2My4zaC0xLjdWNy42SDQzdjAuOWMwLjItMC4zLDAuNC0wLjUsMC42LTAuN2MwLjQtMC4zLDAuOC0wLjQsMS4zLTAuNEM0NS43LDcuNSw0Ni4zLDcuNyw0Ni44LDguM3oKCQkJCQkgTTQ1LjUsOS41Yy0wLjItMC40LTAuNi0wLjYtMS4xLTAuNmMtMC42LDAtMSwwLjMtMS4zLDAuOUM0MywxMC4xLDQzLDEwLjUsNDMsMTFjMCwwLjcsMC4yLDEuMywwLjYsMS42CgkJCQkJYzAuMiwwLjIsMC41LDAuMywwLjgsMC4zYzAuNSwwLDAuOC0wLjIsMS4xLTAuNXMwLjQtMC44LDAuNC0xLjRDNDUuOSwxMC4zLDQ1LjgsOS45LDQ1LjUsOS41eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU0LjEsOC4zYzAuNSwwLjYsMC44LDEuNCwwLjgsMi40YzAsMS4xLTAuMywyLTAuOCwyLjZzLTEuMiwwLjktMiwwLjljLTAuNSwwLTAuOS0wLjEtMS4zLTAuNAoJCQkJCWMtMC4yLTAuMS0wLjQtMC4zLTAuNS0wLjZ2My4zaC0xLjdWNy42aDEuNnYwLjljMC4yLTAuMywwLjQtMC41LDAuNi0wLjdjMC40LTAuMywwLjgtMC40LDEuMy0wLjRDNTMsNy41LDUzLjYsNy43LDU0LjEsOC4zegoJCQkJCSBNNTIuOSw5LjVjLTAuMi0wLjQtMC42LTAuNi0xLjEtMC42Yy0wLjYsMC0xLDAuMy0xLjMsMC45Yy0wLjEsMC4zLTAuMiwwLjctMC4yLDEuMmMwLDAuNywwLjIsMS4zLDAuNiwxLjYKCQkJCQljMC4yLDAuMiwwLjUsMC4zLDAuOCwwLjNjMC41LDAsMC44LTAuMiwxLjEtMC41czAuNC0wLjgsMC40LTEuNEM1My4yLDEwLjMsNTMuMSw5LjksNTIuOSw5LjV6Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTcuOCwxNGgtMS43VjUuNGgxLjdWMTR6Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjEuMiw2LjloLTEuN1Y1LjNoMS43VjYuOXogTTU5LjUsNy42aDEuN1YxNGgtMS43VjcuNnoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ni45LDcuN2MwLjQsMC4yLDAuOCwwLjUsMS4xLDAuOWMwLjMsMC40LDAuNCwwLjgsMC41LDEuM2MwLDAuMywwLjEsMC43LDAuMSwxLjNoLTQuNwoJCQkJCWMwLDAuNiwwLjIsMS4xLDAuNywxLjNjMC4zLDAuMiwwLjYsMC4yLDAuOSwwLjJjMC40LDAsMC43LTAuMSwwLjktMC4zYzAuMS0wLjEsMC4yLTAuMywwLjMtMC40aDEuN2MwLDAuNC0wLjMsMC44LTAuNiwxLjIKCQkJCQljLTAuNiwwLjYtMS40LDAuOS0yLjQsMC45Yy0wLjksMC0xLjYtMC4zLTIuMi0wLjhjLTAuNy0wLjUtMS0xLjQtMS0yLjZjMC0xLjEsMC4zLTIsMC45LTIuNWMwLjYtMC42LDEuMy0wLjksMi4zLTAuOQoJCQkJCUM2Niw3LjQsNjYuNSw3LjUsNjYuOSw3Ljd6IE02NC40LDkuMmMtMC4yLDAuMi0wLjQsMC42LTAuNCwxaDIuOWMwLTAuNC0wLjItMC44LTAuNC0xYy0wLjMtMC4yLTAuNi0wLjMtMS0wLjMKCQkJCQlDNjUsOC44LDY0LjcsOC45LDY0LjQsOS4yeiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTczLDcuNWMwLDAsMC4xLDAsMC4xLDB2MS43Yy0wLjEsMC0wLjIsMC0wLjMsMHMtMC4xLDAtMC4yLDBjLTAuNywwLTEuMSwwLjItMS40LDAuNwoJCQkJCWMtMC4xLDAuMi0wLjIsMC42LTAuMiwxLjFWMTRoLTEuN1Y3LjZINzF2MS4xYzAuMy0wLjQsMC41LTAuNywwLjctMC45QzcyLDcuNiw3Mi40LDcuNSw3Myw3LjVDNzIuOSw3LjUsNzMsNy41LDczLDcuNXoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04My40LDEwLjNjLTAuNSwwLjQtMS4yLDAuNi0yLjIsMC42aC0xLjhWMTRoLTEuOFY1LjRoMy43YzAuOSwwLDEuNSwwLjIsMiwwLjdjMC41LDAuNCwwLjgsMS4xLDAuOCwyLjEKCQkJCQlDODQuMSw5LjEsODMuOSw5LjgsODMuNCwxMC4zeiBNODIsNy4yYy0wLjItMC4yLTAuNS0wLjMtMS0wLjNoLTEuNnYyLjVIODFjMC40LDAsMC43LTAuMSwxLTAuM3MwLjMtMC41LDAuMy0xCgkJCQkJQzgyLjMsNy43LDgyLjIsNy4zLDgyLDcuMnoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NS42LDUuNGgxLjh2Ny4xaDQuM1YxNGgtNi4xVjUuNHoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05My43LDYuM2MwLjctMC43LDEuNi0xLjEsMi43LTEuMWMxLjQsMCwyLjUsMC41LDMuMiwxLjRjMC40LDAuNSwwLjYsMS4xLDAuNiwxLjZoLTEuOAoJCQkJCWMtMC4xLTAuNC0wLjMtMC43LTAuNC0wLjljLTAuMy0wLjQtMC44LTAuNi0xLjQtMC42Yy0wLjYsMC0xLjIsMC4zLTEuNSwwLjhzLTAuNiwxLjMtMC42LDIuMnMwLjIsMS43LDAuNiwyLjIKCQkJCQljMC40LDAuNSwwLjksMC43LDEuNSwwLjdjMC42LDAsMS4xLTAuMiwxLjQtMC42YzAuMi0wLjIsMC4zLTAuNiwwLjQtMWgxLjhjLTAuMiwwLjktMC41LDEuNy0xLjIsMi4zcy0xLjUsMC45LTIuNCwwLjkKCQkJCQljLTEuMiwwLTIuMi0wLjQtMi45LTEuMmMtMC43LTAuOC0xLjEtMS45LTEuMS0zLjNDOTIuNSw4LjIsOTIuOSw3LjEsOTMuNyw2LjN6Ii8+CgkJCTwvZz4KCQk8L2c+Cgk8L2c+CjwvZz4KPC9zdmc+Cg=="
            alt="ubio-sdk-header-supplier" />
        <img
            width="15"
            height="15"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT4rPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbC1vcGFjaXR5PSIwLjIiPgogICAgICAgIDxnIGlkPSJTdGFuZGFyZC1wYWdlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzIxLjAwMDAwMCwgLTIzNi4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iKyIgcG9pbnRzPSI3MzUuMDk1MjM4IDI0NC45ODQ5NDYgNzI5LjE4NDMzMiAyNDQuOTg0OTQ2IDcyOS4xODQzMzIgMjUwLjggNzI2LjkxMDkwNiAyNTAuOCA3MjYuOTEwOTA2IDI0NC45ODQ5NDYgNzIxIDI0NC45ODQ5NDYgNzIxIDI0Mi43NDgzODcgNzI2LjkxMDkwNiAyNDIuNzQ4Mzg3IDcyNi45MTA5MDYgMjM2LjkzMzMzMyA3MjkuMTg0MzMyIDIzNi45MzMzMzMgNzI5LjE4NDMzMiAyNDIuNzQ4Mzg3IDczNS4wOTUyMzggMjQyLjc0ODM4NyI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
            alt="ubio-sdk-header-plus" />
        <img
            width="112"
            height="18"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMTIgMTgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDExMiAxODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHRpdGxlPkdyb3VwIDE5PC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CjxnIGlkPSJQYWdlLTEiPgoJPGcgaWQ9IlN0YW5kYXJkLXBhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NTcuMDAwMDAwLCAtMjM1LjAwMDAwMCkiPgoJCTxnIGlkPSJHcm91cC0xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzU3LjAwMDAwMCwgMjM1LjAwMDAwMCkiPgoJCQk8ZyBjbGFzcz0ic3QwIj4KCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNyw0LjRoMmwzLjEsOC42aC0ybC0wLjYtMS44aC0zLjJMMjUuOSwxM0gyNEwyNyw0LjR6IE0yNi45LDkuN2gyLjJMMjgsNi4zTDI2LjksOS43eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM2LjMsNi42YzAuNCwwLjIsMC43LDAuNSwxLDAuOVY2LjZoMS42djYuMWMwLDAuOC0wLjEsMS40LTAuNCwxLjljLTAuNSwwLjctMS40LDEuMS0yLjcsMS4xCgkJCQkJYy0wLjgsMC0xLjUtMC4yLTItMC41cy0wLjgtMC44LTAuOS0xLjRoMS44YzAsMC4yLDAuMSwwLjMsMC4yLDAuNGMwLjIsMC4yLDAuNSwwLjIsMC45LDAuMmMwLjYsMCwxLTAuMiwxLjItMC42CgkJCQkJYzAuMS0wLjMsMC4yLTAuNywwLjItMS4zVjEyYy0wLjIsMC4zLTAuMywwLjUtMC41LDAuNmMtMC4zLDAuMy0wLjgsMC40LTEuMywwLjRjLTAuOCwwLTEuNS0wLjMtMi0wLjlzLTAuNy0xLjQtMC43LTIuMwoJCQkJCWMwLTAuOSwwLjItMS43LDAuNy0yLjRzMS4xLTEsMi0xQzM1LjgsNi41LDM2LDYuNSwzNi4zLDYuNnogTTM2LjgsMTEuMmMwLjMtMC4zLDAuNC0wLjgsMC40LTEuNGMwLTAuNi0wLjEtMS4xLTAuNC0xLjQKCQkJCQlzLTAuNi0wLjUtMS0wLjVjLTAuNiwwLTEsMC4zLTEuMiwwLjhjLTAuMSwwLjMtMC4yLDAuNy0wLjIsMS4xYzAsMC40LDAuMSwwLjcsMC4yLDFjMC4yLDAuNSwwLjYsMC44LDEuMiwwLjgKCQkJCQlDMzYuMiwxMS42LDM2LjYsMTEuNSwzNi44LDExLjJ6Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDMuNiw2LjZjMC40LDAuMiwwLjcsMC41LDEsMC45VjYuNmgxLjZ2Ni4xYzAsMC44LTAuMSwxLjQtMC40LDEuOWMtMC41LDAuNy0xLjQsMS4xLTIuNywxLjEKCQkJCQljLTAuOCwwLTEuNS0wLjItMi0wLjVzLTAuOC0wLjgtMC45LTEuNEg0MmMwLDAuMiwwLjEsMC4zLDAuMiwwLjRjMC4yLDAuMiwwLjUsMC4yLDAuOSwwLjJjMC42LDAsMS0wLjIsMS4yLTAuNgoJCQkJCWMwLjEtMC4zLDAuMi0wLjcsMC4yLTEuM1YxMmMtMC4yLDAuMy0wLjMsMC41LTAuNSwwLjZjLTAuMywwLjMtMC44LDAuNC0xLjMsMC40Yy0wLjgsMC0xLjUtMC4zLTItMC45UzQwLDEwLjgsNDAsOS44CgkJCQkJYzAtMC45LDAuMi0xLjcsMC43LTIuNHMxLjEtMSwyLTFDNDMuMSw2LjUsNDMuNCw2LjUsNDMuNiw2LjZ6IE00NC4yLDExLjJjMC4zLTAuMywwLjQtMC44LDAuNC0xLjRjMC0wLjYtMC4xLTEuMS0wLjQtMS40CgkJCQkJcy0wLjYtMC41LTEtMC41Yy0wLjYsMC0xLDAuMy0xLjIsMC44Yy0wLjEsMC4zLTAuMiwwLjctMC4yLDEuMWMwLDAuNCwwLjEsMC43LDAuMiwxYzAuMiwwLjUsMC42LDAuOCwxLjIsMC44CgkJCQkJQzQzLjYsMTEuNiw0My45LDExLjUsNDQuMiwxMS4yeiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTUxLjMsNi41YzAsMCwwLjEsMCwwLjEsMHYxLjdjLTAuMSwwLTAuMiwwLTAuMywwcy0wLjEsMC0wLjIsMGMtMC43LDAtMS4xLDAuMi0xLjQsMC43CgkJCQkJYy0wLjEsMC4yLTAuMiwwLjYtMC4yLDEuMVYxM2gtMS43VjYuNmgxLjZ2MS4xQzQ5LjYsNy4zLDQ5LjgsNyw1MCw2LjlDNTAuMyw2LjYsNTAuNyw2LjUsNTEuMyw2LjVDNTEuMyw2LjUsNTEuMyw2LjUsNTEuMyw2LjV6CgkJCQkJIi8+CgkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTYuNiw2LjdjMC40LDAuMiwwLjgsMC41LDEuMSwwLjlDNTgsOC4xLDU4LjEsOC41LDU4LjIsOWMwLDAuMywwLjEsMC43LDAuMSwxLjNoLTQuNwoJCQkJCWMwLDAuNiwwLjIsMS4xLDAuNywxLjNjMC4zLDAuMiwwLjYsMC4yLDAuOSwwLjJjMC40LDAsMC43LTAuMSwwLjktMC4zYzAuMS0wLjEsMC4yLTAuMywwLjMtMC40aDEuN2MwLDAuNC0wLjMsMC44LTAuNiwxLjIKCQkJCQljLTAuNiwwLjYtMS40LDAuOS0yLjQsMC45Yy0wLjksMC0xLjYtMC4zLTIuMi0wLjhjLTAuNi0wLjUtMS0xLjQtMS0yLjZjMC0xLjEsMC4zLTIsMC45LTIuNWMwLjYtMC42LDEuMy0wLjksMi4zLTAuOQoJCQkJCUM1NS43LDYuNCw1Ni4yLDYuNSw1Ni42LDYuN3ogTTU0LjEsOC4yYy0wLjIsMC4yLTAuNCwwLjYtMC40LDFoMi45YzAtMC40LTAuMi0wLjgtMC40LTFjLTAuMy0wLjItMC42LTAuMy0xLTAuMwoJCQkJCUM1NC43LDcuOCw1NC4zLDcuOSw1NC4xLDguMnoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik02Mi4zLDYuNmMwLjQsMC4yLDAuNywwLjUsMSwwLjlWNi42aDEuNnY2LjFjMCwwLjgtMC4xLDEuNC0wLjQsMS45Yy0wLjUsMC43LTEuNCwxLjEtMi43LDEuMQoJCQkJCWMtMC44LDAtMS41LTAuMi0yLTAuNXMtMC44LTAuOC0wLjktMS40aDEuOGMwLDAuMiwwLjEsMC4zLDAuMiwwLjRjMC4yLDAuMiwwLjUsMC4yLDAuOSwwLjJjMC42LDAsMS0wLjIsMS4yLTAuNgoJCQkJCWMwLjEtMC4zLDAuMi0wLjcsMC4yLTEuM1YxMmMtMC4yLDAuMy0wLjMsMC41LTAuNSwwLjZDNjIuNCwxMi45LDYyLDEzLDYxLjQsMTNjLTAuOCwwLTEuNS0wLjMtMi0wLjlzLTAuNy0xLjQtMC43LTIuMwoJCQkJCWMwLTAuOSwwLjItMS43LDAuNy0yLjRzMS4xLTEsMi0xQzYxLjgsNi41LDYyLDYuNSw2Mi4zLDYuNnogTTYyLjgsMTEuMmMwLjMtMC4zLDAuNC0wLjgsMC40LTEuNGMwLTAuNi0wLjEtMS4xLTAuNC0xLjQKCQkJCQljLTAuMy0wLjMtMC42LTAuNS0xLTAuNWMtMC42LDAtMSwwLjMtMS4yLDAuOGMtMC4xLDAuMy0wLjIsMC43LTAuMiwxLjFjMCwwLjQsMC4xLDAuNywwLjIsMWMwLjIsMC41LDAuNiwwLjgsMS4yLDAuOAoJCQkJCUM2Mi4yLDExLjYsNjIuNiwxMS41LDYyLjgsMTEuMnoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik02OSw5LjFjMC4zLDAsMC41LTAuMSwwLjctMC4xQzY5LjksOC45LDcwLDguNyw3MCw4LjVjMC0wLjMtMC4xLTAuNC0wLjMtMC41Yy0wLjItMC4xLTAuNS0wLjEtMC44LTAuMQoJCQkJCWMtMC40LDAtMC43LDAuMS0wLjgsMC4zYy0wLjEsMC4xLTAuMiwwLjMtMC4yLDAuNmgtMS42YzAtMC42LDAuMi0xLDAuNS0xLjRjMC40LTAuNiwxLjItMC44LDIuMy0wLjhjMC43LDAsMS4zLDAuMSwxLjksMC40CgkJCQkJYzAuNSwwLjMsMC44LDAuOCwwLjgsMS42djIuOWMwLDAuMiwwLDAuNCwwLDAuN2MwLDAuMiwwLDAuNCwwLjEsMC40czAuMSwwLjEsMC4yLDAuMlYxM2gtMS44Yy0wLjEtMC4xLTAuMS0wLjItMC4xLTAuNAoJCQkJCXMwLTAuMiwwLTAuNGMtMC4yLDAuMi0wLjUsMC41LTAuOCwwLjZjLTAuNCwwLjItMC44LDAuMy0xLjIsMC4zYy0wLjYsMC0xLjEtMC4yLTEuNC0wLjVTNjYsMTEuOSw2NiwxMS4zYzAtMC44LDAuMy0xLjQsMC45LTEuNwoJCQkJCWMwLjMtMC4yLDAuOC0wLjMsMS41LTAuNEw2OSw5LjF6IE03MCw5LjljLTAuMSwwLjEtMC4yLDAuMS0wLjMsMC4yYy0wLjEsMC0wLjMsMC4xLTAuNCwwLjFsLTAuNCwwLjFjLTAuNCwwLjEtMC42LDAuMS0wLjgsMC4yCgkJCQkJYy0wLjMsMC4yLTAuNCwwLjQtMC40LDAuN2MwLDAuMywwLjEsMC41LDAuMiwwLjZjMC4yLDAuMSwwLjQsMC4yLDAuNiwwLjJjMC40LDAsMC43LTAuMSwxLTAuM2MwLjMtMC4yLDAuNS0wLjYsMC41LTEuMlY5Ljl6Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNzIuNSw3LjlWNi43aDAuOVY0LjlINzV2MS44aDF2MS4yaC0xdjMuNGMwLDAuMywwLDAuNCwwLjEsMC41czAuMywwLjEsMC42LDAuMWMwLjEsMCwwLjEsMCwwLjIsMAoJCQkJCXMwLjEsMCwwLjIsMHYxLjJsLTAuOCwwYy0wLjgsMC0xLjMtMC4xLTEuNi0wLjRjLTAuMi0wLjItMC4zLTAuNS0wLjMtMC45VjcuOUg3Mi41eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTgyLjQsMTIuMmMtMC41LDAuNy0xLjQsMS0yLjUsMXMtMS45LTAuMy0yLjUtMXMtMC44LTEuNS0wLjgtMi40YzAtMC45LDAuMy0xLjcsMC44LTIuNAoJCQkJCWMwLjUtMC43LDEuNC0xLDIuNS0xczEuOSwwLjMsMi41LDFjMC41LDAuNywwLjgsMS41LDAuOCwyLjRDODMuMiwxMC44LDgzLDExLjYsODIuNCwxMi4yeiBNODEuMSwxMS4zYzAuMy0wLjMsMC40LTAuOCwwLjQtMS41CgkJCQkJYzAtMC42LTAuMS0xLjEtMC40LTEuNUM4MC44LDgsODAuNSw3LjgsODAsNy44Uzc5LjEsOCw3OC44LDguM2MtMC4zLDAuMy0wLjQsMC44LTAuNCwxLjVjMCwwLjYsMC4xLDEuMSwwLjQsMS41CgkJCQkJYzAuMywwLjMsMC42LDAuNSwxLjEsMC41UzgwLjgsMTEuNiw4MS4xLDExLjN6Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNODgsNi41YzAsMCwwLjEsMCwwLjEsMHYxLjdjLTAuMSwwLTAuMiwwLTAuMywwcy0wLjEsMC0wLjIsMGMtMC43LDAtMS4xLDAuMi0xLjQsMC43CgkJCQkJYy0wLjEsMC4yLTAuMiwwLjYtMC4yLDEuMVYxM2gtMS43VjYuNkg4NnYxLjFjMC4zLTAuNCwwLjUtMC43LDAuNy0wLjlDODcsNi42LDg3LjQsNi41LDg4LDYuNUM4Ny45LDYuNSw4OCw2LjUsODgsNi41eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTk0LjIsMTNoLTEuOFY0LjRoMS44VjEzeiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwMC45LDdjMC40LDAuMywwLjYsMC45LDAuNiwxLjdWMTNoLTEuN1Y5LjFjMC0wLjMsMC0wLjYtMC4xLTAuOGMtMC4yLTAuMy0wLjUtMC41LTAuOS0wLjUKCQkJCQljLTAuNiwwLTAuOSwwLjItMS4yLDAuN2MtMC4xLDAuMy0wLjIsMC42LTAuMiwxVjEzaC0xLjdWNi42aDEuNnYwLjlDOTcuNiw3LjIsOTcuOCw3LDk4LDYuOGMwLjMtMC4zLDAuOC0wLjQsMS4zLTAuNAoJCQkJCUMxMDAsNi41LDEwMC41LDYuNiwxMDAuOSw3eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwNi45LDguOWMwLTAuMi0wLjEtMC41LTAuMi0wLjZjLTAuMi0wLjMtMC41LTAuNC0wLjktMC40Yy0wLjYsMC0xLDAuMy0xLjIsMC44Yy0wLjEsMC4zLTAuMiwwLjctMC4yLDEuMgoJCQkJCWMwLDAuNSwwLjEsMC44LDAuMiwxLjFjMC4yLDAuNSwwLjYsMC44LDEuMSwwLjhjMC40LDAsMC43LTAuMSwwLjgtMC4zYzAuMi0wLjIsMC4zLTAuNSwwLjMtMC44aDEuN2MwLDAuNS0wLjIsMS0wLjYsMS40CgkJCQkJYy0wLjUsMC43LTEuMywxLjEtMi4zLDEuMXMtMS44LTAuMy0yLjMtMC45Yy0wLjUtMC42LTAuNy0xLjQtMC43LTIuNGMwLTEuMSwwLjMtMS45LDAuOC0yLjZzMS4zLTAuOSwyLjItMC45CgkJCQkJYzAuOCwwLDEuNSwwLjIsMiwwLjVzMC44LDEsMC45LDEuOUgxMDYuOXoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMDkuOCwxMS4yaDEuOFYxM2gtMS44VjExLjJ6Ii8+CgkJCTwvZz4KCQkJPHBhdGggaWQ9Ikljb24tU2hhcGUiIGNsYXNzPSJzdDEiIGQ9Ik0wLDB2MThoNnYtMy41aDJWMThoNlYwSDB6IE0yLDJoMnYySDJWMnogTTYsMmgydjJINlYyeiBNMTAsMmgydjJoLTJWMnogTTIsNmgydjJIMlY2egoJCQkJIE02LDZoMnYySDZWNnogTTEwLDZoMnYyaC0yVjZ6IE0yLDEwaDJ2MkgyVjEweiBNNiwxMGgydjJINlYxMHogTTEwLDEwaDJ2MmgtMlYxMHogTTIsMTRoMnYySDJWMTR6IE0xMCwxNGgydjJoLTJWMTR6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo="
            alt="ubio-sdk-header-aggregator" />
        </div>
    `;

    return header;
}
