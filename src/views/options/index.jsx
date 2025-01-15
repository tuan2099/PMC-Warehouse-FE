import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import PermissionForm from './components/optionForm';
import { Box, Checkbox, FormControlLabel, Grid, Typography, Paper, Button } from '@mui/material';

const permissionsData = [
  {
    role: 'Admin',
    modules: [
      {
        name: 'Warehouse',
        permissions: ['view', 'add', 'update', 'delete']
      },
      {
        name: 'Customer',
        permissions: ['view', 'add', 'update']
      }
    ]
  },
  {
    role: 'User',
    modules: [
      {
        name: 'Warehouse',
        permissions: ['view']
      },
      {
        name: 'Customer',
        permissions: ['view', 'add']
      }
    ]
  }
];

function Option() {
  const [permissions, setPermissions] = useState(permissionsData);

  const handleCheckboxChange = (role, moduleName, permission) => {
    setPermissions((prev) =>
      prev.map((r) => {
        if (r.role === role) {
          return {
            ...r,
            modules: r.modules.map((mod) => {
              if (mod.name === moduleName) {
                return {
                  ...mod,
                  permissions: mod.permissions.includes(permission)
                    ? mod.permissions.filter((p) => p !== permission) // Remove permission
                    : [...mod.permissions, permission] // Add permission
                };
              }
              return mod;
            })
          };
        }
        return r;
      })
    );
  };

  const handleSave = () => {
    console.log('Saved Permissions:', permissions);
    alert('Permissions updated successfully!');
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Role Permission Management
      </Typography>

      {permissions.map((roleData) => (
        <Paper key={roleData.role} elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {roleData.role}
          </Typography>

          {roleData.modules.map((module) => (
            <Box key={module.name} mb={2}>
              <Typography variant="h6">{module.name}</Typography>
              <Grid container spacing={1}>
                {module.permissions
                  .concat(['view', 'add', 'update', 'delete']) // Ensure all permissions are rendered
                  .filter((perm, index, self) => self.indexOf(perm) === index) // Remove duplicates
                  .map((permission) => (
                    <Grid item key={permission}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={module.permissions.includes(permission)}
                            onChange={() => handleCheckboxChange(roleData.role, module.name, permission)}
                          />
                        }
                        label={permission}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ))}
        </Paper>
      ))}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Permissions
      </Button>
    </Box>
  );
}

export default Option;
