SELECT 
    u.ID,
    u.UserName,
    up.UserName
FROM `USER` u
LEFT JOIN `USER` up ON u.ID = up.Parent;